import numpy as np
import pickle
import json
import faiss
from sentence_transformers import SentenceTransformer

# Load SentenceTransformer model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Load data from disk
try:
    with open("documents.pkl", "rb") as f:
        documents = pickle.load(f)
    with open("metadata.json", "r") as f:
        metadata = json.load(f)
    embeddings = np.load("embeddings.npy")
    index = faiss.read_index("faiss_index.bin")
    print("[RAG] All data loaded successfully.")
except Exception as e:
    print(f"[RAG ERROR] Failed to load RAG components: {e}")
    documents = []
    metadata = {}
    embeddings = np.array([])
    index = None

# Retrieve top-K documents for a query
def retrieve_docs(query: str, top_k: int = 5) -> list:
    try:
        print(f"[RAG] Query: {query}")
        query_embedding = model.encode([query])
        distances, indices = index.search(np.array(query_embedding), top_k)

        results = []
        for i, idx in enumerate(indices[0]):
            results.append({
                "index": int(idx),
                "text": documents[idx]["text"],
                "score": float(distances[0][i]),
                "metadata": metadata.get(str(idx), {})
            })

        print(f"[RAG] Retrieved {len(results)} results.")
        return results
    except Exception as e:
        print(f"[RAG ERROR] Failed to retrieve docs: {e}")
        return []
