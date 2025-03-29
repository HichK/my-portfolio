# --- Imports ---
from flask import Flask, request, jsonify
from flask_cors import CORS
from google.cloud import firestore
import openai
import os
import time
import re

app = Flask(__name__)
app.config['RATELIMIT_HEADERS_ENABLED'] = True

# --- CORS ---
CORS(app, origins=["http://localhost:8080", "https://hichamkhawand.com"], 
     supports_credentials=True, 
     allow_headers=["Content-Type", "X-API-Key"],  # Allow custom headers
     methods=["GET", "POST", "OPTIONS"])  # Allow required HTTP methods

# --- Secrets ---
openai.api_key = os.getenv("OPENAI_API_KEY")
API_KEY = os.getenv("CHAT_API_KEY")

@app.after_request
def log_rate_limit(response):
    remaining = response.headers.get("X-RateLimit-Remaining")
    if remaining is not None:
        print(f"Remaining requests: {remaining}")
    else:
        print("X-RateLimit-Remaining header not found.")
    return response

def get_client_ip():
    """Resolve client IP, considering X-Forwarded-For header for proxies."""
    # X-Forwarded-For may contain multiple IPs, leftmost is the original client
    forwarded_for = request.headers.get('X-Forwarded-For', request.remote_addr)
    if forwarded_for:
        ip = forwarded_for.split(',')[0].strip()
    else:
        ip = request.remote_addr or ''
    return ip

from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_limiter.errors import RateLimitExceeded
# Initialize Flask-Limiter, applying a global rate limit of "5 per minute" per IP
limiter = Limiter(
    get_client_ip,                         # Pass key_func here
    app=app,                               # Associate with the Flask app
    default_limits=["5 per minute"],       # Apply 5 requests/minute to all routes by default
    storage_uri="memory://",               # In-memory store (for demo/testing only!)
)

@app.errorhandler(429)  # Rate limit exceeded
def ratelimit_handler(e):
    jsonify({
        "response": "You exceeded the limit of 5 requests per minute, please wait a little.\n\nThe real Hicham Khawand will have to pay a lot if overused :)",
        }), 200


@app.before_request
def api_key_and_cors_protection():
    if request.method == "OPTIONS":
        return  # Skip API key validation for preflight requests

    if request.path == "/assistant":
        # API Key check
        key = request.headers.get("X-API-Key")
        if not key or key != API_KEY:
            return jsonify({"error": "Invalid or missing API Key"}), 403

        
# --- Routes ---
@app.route("/assistant", methods=["POST"])
def assistant():
    data = request.get_json()
    user_input = data.get("input")
    history = data.get("history", [])
    role = data.get("role", "user")
    date = data.get("date", None)
    currentTime = data.get("time", None)

    if not user_input:
        return jsonify({"error": "Missing input"}), 400

    # Get client IP
    client_ip = get_client_ip()

    # OpenAI integration
    try:
        assistant_id = get_or_create_assistant("Hicham_Khawand_virtual")
        if not assistant_id:
            return jsonify({"error": "Assistant error"}), 500

        response = run_assistant(assistant_id, user_input,role, history, date, currentTime)

        # Log to Firestore
        try:
            db = firestore.Client()
            log_entry = {
                "client_ip": client_ip,
                "role": role,
                "payload": user_input,
                "history": history,
                "response": response,
                "timestamp": firestore.SERVER_TIMESTAMP,
                "date": date,
                "time": currentTime,
            }
            db.collection("Hicham_Khawand_virtual_chat_logs").add(log_entry)
        except Exception as e:
            print(f"Error logging to Firestore: {e}")

        return jsonify({"response": response}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal server error"}), 500
    

@app.route("/test", methods=["GET"])
def test():
    return "Server is up and CORS protected", 200

# --- OpenAI Utility Functions ---

def get_or_create_assistant(name):
    try:
        assistants = openai.beta.assistants.list().data
        for assistant in assistants:
            if assistant.name == name:
                return assistant.id
        assistant = openai.beta.assistants.create(
            name=name,
            instructions="You are a helpful virtual assistant.",
            tools=[],
            model="gpt-4o-mini"
        )
        return assistant.id
    except Exception as e:
        print(f"Error creating or fetching assistant: {e}")
        return None

def run_assistant(assistant_id, user_input, role, history, date, currentTime):
    try:
        thread = openai.beta.threads.create()

        # Add history messages to the thread
        for message in history:
            openai.beta.threads.messages.create(
                thread_id=thread.id,
                role=message.get("role", "user"),  # Default to "user" if role is missing
                content=message.get("content", "")  # Default to empty string if content is missing
            )

        # Add the current user input to the thread
        openai.beta.threads.messages.create(
            thread_id=thread.id,
            role=role,
            content=user_input + f"\n\nCurrentDate: {date}\nCurrentTime: {currentTime}"  # Include date and time
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
                        raw_text = message.content[0].text.value
                        # ✅ Remove citation references like  
                        cleaned_text = re.sub(r"【\d+:\d+†source】", "", raw_text)
                        return cleaned_text.strip()
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
            headers=dict(request.headers),  # convert to mutable dict
            data=request.get_data()
        )
        return (response.data, response.status_code, response.headers.items())

# ✅ For local development
if __name__ == "__main__":
    app.run(debug=True, port=8080)
