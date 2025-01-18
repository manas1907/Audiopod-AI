***AudioPod AI***

This project is a full-stack application that allows users to record audio, upload audio files for transcription, and synthesize text-to-speech (TTS) responses. The application is built using Next.js for the frontend and FastAPI for the backend.

***Features***

🎙️ Audio Recording: Record audio using the browser's MediaRecorder API.

📂 Audio Upload: Upload audio files (.wav, .mp3) for transcription.

📝 Transcription: Display transcribed text on the frontend.

🔊 Text-to-Speech: Synthesize text into audio and play it back.

***Project Structure***

AudioPod AI/
├── backend/      # Python FastAPI backend
├── frontend/     # Next.js frontend
└── README.md     # Project documentation

***Prerequisites***

Node.js: Version ^18.18.0 or higher.

Python: Version 3.7 or higher.

npm: Installed with Node.js.

pip: Installed with Python.


***Usage***

Open the application in your browser at http://localhost:3000.

Use the Start Recording and Stop Recording buttons to record audio.

Upload an audio file for transcription by clicking the Upload and Transcribe button.

View the transcribed text displayed on the page.

Enter text and click Synthesize TTS Audio to play a text-to-speech response.

***File Structure***

Backend

main.py: Contains the FastAPI application logic.

requirements.txt: Lists the Python dependencies.

Frontend

pages/: Contains the Next.js pages.

styles/: Contains CSS files.

public/: Static assets.

package.json: Lists Node.js dependencies and scripts.

***Error Handling***

The backend handles errors such as missing files or unsupported formats.

Proper HTTP status codes and error messages are returned for invalid requests.

***Future Improvements***

Integrate Real STT/TTS Libraries: Use APIs like Google Speech-to-Text or Azure TTS for real audio processing.

Database Integration: Store transcription data in a database (e.g., SQLite, PostgreSQL) for historical reference.

Authentication: Add user authentication and authorization.

Frontend Enhancements: Improve UI/UX with better styles and additional features.

***Libraries Used***

Backend

FastAPI: For building the backend API.

Uvicorn: For running the FastAPI server.

***Frontend***

Next.js: For server-side rendered React applications.

React: For building the user interface.

