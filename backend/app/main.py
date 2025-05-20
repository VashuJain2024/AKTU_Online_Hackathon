from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
import tempfile
import traceback

import nltk

# ✅ Add this block
nltk_data_dir = os.path.join(os.path.dirname(__file__), "nltk_data")
os.makedirs(nltk_data_dir, exist_ok=True)
nltk.data.path.append(nltk_data_dir)
for resource in ["stopwords", "punkt", "wordnet"]:
    try:
        nltk.data.find(f"corpora/{resource}")
    except LookupError:
        nltk.download(resource, download_dir=nltk_data_dir)

from pyresparser import ResumeParser

app = FastAPI(title="Resume Skill Extractor API with NLP")

# CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev only. Use specific domain in production.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/extract-skills")
async def extract_skills(file: UploadFile = File(...)):
    # Validate file type
    if file.content_type not in [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]:
        raise HTTPException(
            status_code=400, detail="Only PDF or DOCX files are supported."
        )

    # Save uploaded file to a safe temp file
    try:
        suffix = os.path.splitext(file.filename)[1]
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            tmp.write(await file.read())
            temp_file_path = tmp.name

        # Parse resume using pyresparser
        data = ResumeParser(temp_file_path).get_extracted_data()

        if not data or "skills" not in data:
            raise HTTPException(status_code=400, detail="Could not extract skills.")

        return {
            "name": data.get("name", ""),
            "email": data.get("email", ""),
            "skills": data.get("skills", []),
            "education": data.get("education", []),
            "experience": data.get("total_experience", "N/A"),
        }

    except Exception as e:
        print("🔥 Full Error Traceback 🔥")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")

    finally:
        # Clean up the temp file
        try:
            if os.path.exists(temp_file_path):
                os.remove(temp_file_path)
        except Exception:
            pass


@app.get("/")
async def root():
    return {"message": "Resume Skills Extractor API with NLP is running 🚀"}


# Only runs if file is run directly (useful for local dev)
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
