from flask import Flask, request, jsonify
from google.cloud import firestore
import openai
import os
import time

app = Flask(__name__)
db = firestore.Client()

openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_id = data.get("user_id")
    prompt = data.get("prompt")

    if not prompt or not user_id:
        return jsonify({"error": "Missing prompt or user_id"}), 400

    # Save user message to Firestore
    db.collection("chats").add({
        "user_id": user_id,
        "role": "user",
        "message": prompt
    })

    return jsonify({"message": "Message saved successfully"}), 200

@app.route("/assistant", methods=["POST"])
def assistant():
    data = request.get_json()
    user_input = data.get("input")

    if not user_input:
        return jsonify({"error": "Missing input"}), 400

    assistant_id = get_or_create_assistant("Hicham_Khawand_virtual")
    if not assistant_id:
        return jsonify({"error": "Failed to create or retrieve assistant"}), 500

    response = run_assistant(assistant_id, user_input)
    return jsonify({"response": response}), 200

def get_or_create_assistant(name):
    """
    Creates or retrieves an assistant with the given name.
    """
    try:
        assistants = openai.beta.assistants.list().data
        for assistant in assistants:
            if assistant.name == name:
                return assistant.id
    except Exception as e:
        print(f"Error fetching assistants: {e}")
        return None

    try:
        assistant = openai.beta.assistants.create(
            name=name,
            instructions="You are a helpful virtual assistant.",
            tools=[],
            model="gpt-4o-mini"
        )
        return assistant.id
    except Exception as e:
        print(f"Error creating assistant: {e}")
        return None
    

@app.route("/test", methods=["GET"])
def test():
    return "Server is working!"

def run_assistant(assistant_id, user_input):
    """
    Runs the assistant with the given ID and user input.
    """
    try:
        thread = openai.beta.threads.create()

        openai.beta.threads.messages.create(
            thread_id=thread.id,
            role="user",
            content=user_input
        )

        run = openai.beta.threads.runs.create(
            thread_id=thread.id,
            assistant_id=assistant_id
        )

        while True:
            run_status = openai.beta.threads.runs.retrieve(
                thread_id=thread.id,
                run_id=run.id
            )
            if run_status.status == "completed":
                messages = openai.beta.threads.messages.list(thread_id=thread.id).data
                for message in messages:
                    if message.role == "assistant":
                        return message.content[0].text.value
            elif run_status.status in ["failed", "cancelled", "expired"]:
                return "The assistant failed to complete the request."
            time.sleep(1)
    except Exception as e:
        print(f"Error running assistant: {e}")
        return "An error occurred while processing your request."
    
# ✅ For Google Cloud Functions
def my_portfolio_chat_entry_point(request):
    with app.test_client() as client:
        response = client.open(
            path=request.full_path if request.query_string else request.path,
            method=request.method,
            headers=dict(request.headers),  # ✅ convert to mutable dict
            data=request.get_data()
        )
        return (response.data, response.status_code, response.headers.items())


# ✅ For local development
if __name__ == "__main__":
    app.run(debug=True, port=8080)
