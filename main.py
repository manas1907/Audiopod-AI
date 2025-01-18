from fastapi import FastAPI, UploadFile, Form, HTTPException
from fastapi.responses import JSONResponse, FileResponse
import os

app = FastAPI()

# Hardcoded responses
TRANSCRIBED_TEXT = "This is a hardcoded transcription of the audio."
TTS_AUDIO_PATH = "output.wav"

# Ensure the TTS audio file exists
if not os.path.exists(TTS_AUDIO_PATH):
    with open(TTS_AUDIO_PATH, "wb") as f:
        f.write(b"Fake audio data for TTS playback.")

@app.post("/api/transcribe")
async def transcribe_audio(file: UploadFile):
    if not file.filename.endswith(('.wav', '.mp3')):
        raise HTTPException(status_code=400, detail="Unsupported file format")
    
    # Placeholder for real STT logic
    return JSONResponse(content={"transcription": TRANSCRIBED_TEXT})

@app.post("/api/synthesize")
async def synthesize_text(text: str = Form(...)):
    if os.path.exists(TTS_AUDIO_PATH):
        return FileResponse(TTS_AUDIO_PATH, media_type="audio/wav")
    raise HTTPException(status_code=500, detail="Audio file missing")