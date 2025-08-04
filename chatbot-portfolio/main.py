import os
import re
import difflib
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rag import retrieve_docs

# FastAPI app setup
app = FastAPI(title="Developer Portfolio Chatbot")

# Allow all origins for now (can restrict later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True
)

# Request and Response schema
class ChatRequest(BaseModel):
    question: str

class ChatResponse(BaseModel):
    response: str
    docs: list

@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    try:
        user_question = req.question.strip()
        print(f"[INFO] Received question: {user_question}")

        if not user_question:
            raise HTTPException(status_code=400, detail="Question is empty")

        # Step 1: Retrieve relevant documents
        docs = retrieve_docs(user_question, top_k=5)
        print(f"[INFO] Retrieved {len(docs)} documents")

        if not docs:
            return ChatResponse(
                response="🤖 Sorry, I couldn't find any relevant information to answer your question.",
                docs=[]
            )

        # Step 2: Aggregate context text
        context_text = "\n".join([doc["text"] for doc in docs])

        # Step 3: Extract all Q&A pairs from context
        faq_pairs = re.findall(r"Q:\s*(.+?)\s*A:\s*(.+?)(?=\nQ:|\Z)", context_text, re.DOTALL)

        best_match = None
        best_score = 0.0

        for q_text, a_text in faq_pairs:
            score = difflib.SequenceMatcher(None, q_text.lower(), user_question.lower()).ratio()
            if score > best_score:
                best_score = score
                best_match = a_text.strip()

        # Step 4: Use best match if confidence is high enough
        if best_match and best_score > 0.6:
            print(f"[INFO] Fuzzy match found with score {best_score:.2f}")
            answer = best_match
        else:
            print("[INFO] No strong match found. Using top-ranked context snippet.")
            answer = docs[0]['text'].strip()

        return ChatResponse(
            response=answer,
            docs=docs
        )

    except Exception as e:
        print(f"[ERROR] Chat failed: {e}")
        raise HTTPException(status_code=500, detail=f"Server Error: {str(e)}")
