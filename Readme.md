I want to express my gratitude to [lovable.dev](https://lovable.dev) for providing the initial UI components and design inspiration for this project. While I started with their components, I later customized and modified them independently to better suit my needs.

### Hosting
- Backend: Google Cloud
- Frontend: Netlify

### Notes
this website primarily features a chat interface powered by an OpenAI assistant. It utilizes a vector-based knowledge base constructed from files located in "backend/RAG Chunks."


### Backend/my_portfolio_chat_entry_point
Just deploy using google cloud cli, this will create a serverless function (gcf?) and will aslo save chats in firestore

### Frontend
build project manually:
npm run build
and then drag and drop files

or (and this is already done for this project)
just link Netlify to the github repos
