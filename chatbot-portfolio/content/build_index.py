import os
import json
import pickle
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer

# Load the embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

documents = []
metadata = {}
embeddings = []

content_dir = "./content"
doc_id = 0

for filename in os.listdir(content_dir):
    if filename.endswith(".txt"):
        filepath = os.path.join(content_dir, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            lines = [line.strip() for line in f if line.strip()]
            for line in lines:
                documents.append({"text": line})
                metadata[str(doc_id)] = {"source_file": filename}
                embedding = model.encode(line)
                embeddings.append(embedding)
                doc_id += 1

# Save the documents
with open("documents.pkl", "wb") as f:
    pickle.dump(documents, f)

# Save the embeddings
embeddings_np = np.vstack(embeddings)
np.save("embeddings.npy", embeddings_np)

# Save the metadata
with open("metadata.json", "w") as f:
    json.dump(metadata, f)

# Build and save FAISS index
index = faiss.IndexFlatL2(embeddings_np.shape[1])
index.add(embeddings_np)
faiss.write_index(index, "faiss_index.bin")

print(f"✅ Indexed {len(documents)} text chunks from '{content_dir}'")
