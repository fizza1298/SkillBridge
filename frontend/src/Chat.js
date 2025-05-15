import React, { useState, useEffect } from "react";
import FloatingEmojis from "./FloatingEmojis";

export default function Chat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [mode, setMode] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
  }, []);

  const speak = (text) => {
    const u = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name === "Daniel" || v.name === "Samantha" || v.name === "Karen");
    if (preferredVoice) u.voice = preferredVoice;
    u.pitch = 1.1;
    u.rate = 0.9;
    speechSynthesis.speak(u);
    setUtterance(u);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setUtterance(null);
  };

  const askAI = async (prompt) => {
    setLoading(true);
  
    const selectedMode = mode === "roleplay" && role ? "feedback" : "explain";
    console.log("🧠 Selected Mode:", selectedMode);
  
    // 🔁 Use your environment variable or hardcode it if needed
    const BASE_URL = process.env.REACT_APP_API_BASE || "https://skillbridge-d7z9.onrender.com";
  
    // 🎯 Use two endpoints
    const endpoint = `${BASE_URL}/api/${selectedMode}/`;
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: prompt })  // ✅ Make sure this is valid JSON
      });
      
  
      const data = await response.json();
      let reply = data.answer || data.error || "No response";
      reply = reply.replace(/[*_`>#-]/g, '');
  
      if (selectedMode === "feedback") {
        setFeedback(reply);
      } else {
        setAnswer(reply);
      }
  
      speak(reply);
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setAnswer("Something went wrong while fetching from AI.");
    }
  
    setLoading(false);
  };
  
//   const askAI = async (prompt) => {
//     setLoading(true);
  
//     // Dynamically determine the mode
//     const selectedMode = mode === "roleplay" && role ? "feedback" : "explain";
//     console.log("🧠 Selected Mode:", selectedMode);
//     try {
//       const response = await fetch("https://skillbridge-d7z9.onrender.com/api/ask/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           question: prompt,
//           mode: selectedMode
//         })
//       });
  
//       const data = await response.json();
//       const reply = data.answer || data.error || "No response";
  
//       if (selectedMode === "feedback") {
//         setFeedback(reply);  // For roleplay
//       } else {
//         setAnswer(reply);    // For ask mode
//       }
  
//       speak(reply);
  
//     } catch (err) {
//       console.error("❌ Fetch error:", err);
//       setAnswer("Something went wrong while fetching from AI.");
//     }
  
//     setLoading(false);
//   };
  
  

  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Your browser doesn't support voice recognition.");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuestion(transcript);
      askAI(transcript);
    };
    recognition.onerror = (e) => {
      console.error("Speech recognition error:", e);
      setListening(false);
    };
    recognition.onend = () => setListening(false);
    setListening(true);
    recognition.start();
  };
  useEffect(() => {
    if (mode === "roleplay" && role && answer) {
      // Wait until mode, role, and answer are all set
      toggleListening(); // which calls askAI() with the transcript
    }
  }, [mode, role, answer]);
  
  const handleRoleplay = (selectedRole) => {
    setMode("roleplay");
    setRole(selectedRole);
  
    const prompt =
      selectedRole === "customer"
        ? "Hi, I’m looking for something specific. Can you help me find it?"
        : "Tell me about your performance this week.";
  
    setAnswer(prompt);
    speak(prompt);
    setQuestion(""); // Clear old question if needed
  };
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-white overflow-hidden">
      <FloatingEmojis />
  
      <div className="flex flex-col items-center justify-center text-center p-10 animate-fade-in min-h-screen">
        <div className="w-full max-w-3xl">
          <h2 className="text-4xl font-bold text-blue-800 mb-10">🎭 Roleplay with Gemini AI</h2>
  
          {!mode && (
            <div className="flex flex-col md:flex-row gap-8 mb-12">
              <button onClick={() => setMode("ask")} className="px-10 py-6 bg-blue-600 text-white rounded-2xl text-3xl shadow hover:bg-blue-700 transition-all">🔍 Ask</button>
              <button onClick={() => setMode("roleplay")} className="px-10 py-6 bg-green-600 text-white rounded-2xl text-3xl shadow hover:bg-green-700 transition-all">🎭 Roleplay</button>
            </div>
          )}
  
          {mode === "ask" && (
            <div>
              <textarea
                rows={4}
                className="w-full p-4 border rounded text-gray-800 text-xl mb-6"
                placeholder="Type your question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <div className="flex gap-6 mb-6 justify-center">
                <button onClick={() => askAI(question)} className="px-6 py-3 bg-blue-700 text-white rounded text-lg">💬 Ask AI</button>
                <button onClick={toggleListening} className="px-6 py-3 bg-purple-700 text-white rounded text-lg">🎙️ Listen</button>
                <button onClick={stopSpeaking} className="px-6 py-3 bg-red-600 text-white rounded text-lg">🛑 Stop</button>
              </div>
            </div>
          )}
  
          {mode === "roleplay" && !role && (
            <div className="flex flex-col items-center gap-6">
              <p className="text-2xl">Choose a role to begin:</p>
              <button onClick={() => handleRoleplay("customer")} className="px-6 py-3 bg-yellow-500 text-white rounded text-lg">🛒 AI as Customer</button>
              <button onClick={() => handleRoleplay("boss")} className="px-6 py-3 bg-indigo-500 text-white rounded text-lg">👔 AI as Boss</button>
            </div>
          )}
  
          {answer && (
            <div className="bg-gray-100 p-6 mt-6 rounded shadow text-left text-xl">
              <strong className="block mb-3">Customer:</strong>
              <p className="whitespace-pre-wrap leading-relaxed text-gray-800">{answer}</p>
            </div>
          )}
  
          {role && (
            <>
              <textarea
                rows={4}
                className="w-full p-4 border rounded text-gray-800 mt-6 text-xl"
                placeholder="Your response..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <div className="flex gap-6 mt-4 justify-center">
                <button onClick={() => askAI(question)} className="px-6 py-3 bg-green-600 text-white rounded text-lg">✅ Submit Response</button>
                <button onClick={toggleListening} className="px-6 py-3 bg-purple-700 text-white rounded text-lg">🎙️ Listen</button>
                <button onClick={stopSpeaking} className="px-6 py-3 bg-red-600 text-white rounded text-lg">🛑 Stop</button>
              </div>
            </>
          )}
  
            {loading && (
              <div className="mt-6 text-gray-600 text-lg italic animate-pulse">
                Thinking...
              </div>
            )}

            {feedback && !loading && (
              <div className="mt-6 bg-green-100 text-green-900 p-4 text-lg rounded shadow">
                {feedback}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
