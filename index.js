import { useState } from "react";

export default function Home() {
  const [audioBlob, setAudioBlob] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [synthesizedAudio, setSynthesizedAudio] = useState(null);

  const handleStartRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Audio recording not supported in this browser.");
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);

    const chunks = [];
    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/wav" });
      setAudioBlob(blob);
    };

    recorder.start();
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const handleUploadAudio = async () => {
    if (!audioBlob) {
      alert("No audio recorded or uploaded.");
      return;
    }

    const formData = new FormData();
    formData.append("file", audioBlob, "recording.wav");

    const response = await fetch("http://127.0.0.1:8000/api/transcribe", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setTranscription(data.transcription || "Error in transcription.");
  };

  const handleSynthesizeAudio = async () => {
    const formData = new FormData();
    formData.append("text", "This is a test TTS response.");

    const response = await fetch("http://127.0.0.1:8000/api/synthesize", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const audioBlob = await response.blob();
      setSynthesizedAudio(URL.createObjectURL(audioBlob));
    } else {
      alert("Failed to synthesize audio.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Audio Recorder</h1>
      <button onClick={isRecording ? handleStopRecording : handleStartRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      <button onClick={handleUploadAudio} disabled={!audioBlob}>
        Upload and Transcribe
      </button>
      <button onClick={handleSynthesizeAudio}>
        Synthesize TTS Audio
      </button>
      <div>
        <h2>Transcription:</h2>
        <p>{transcription || "No transcription yet."}</p>
      </div>
      {synthesizedAudio && (
        <div>
          <h2>Synthesized Audio:</h2>
          <audio controls src={synthesizedAudio}></audio>
        </div>
      )}
    </div>
  );
}