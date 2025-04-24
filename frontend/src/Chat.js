// Chat.js
import React, { useState, useEffect } from "react";

export default function Chat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [mode, setMode] = useState("chat");
  console.log("Current mode:", mode);
  const [role, setRole] = useState("interviewer");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
  }, []);

  const speak = (text) => {
    const u = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(v =>
      v.name === "Daniel" || v.name === "Samantha" || v.name === "Karen"
    );
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

  const askAI = async (q) => {
    const prompt = q || question;
    setLoading(true);

    const fullContext = history.map(h => `You: ${h.q}\nAI: ${h.a}`).join("\n");
    const roleplayIntro = `You are roleplaying as a friendly ${role}. Speak clearly and ask questions like in real life.`;
    const combinedPrompt = `${roleplayIntro}\n${fullContext}\nYou: ${prompt}\nAI:`;

    try {
      const response = await fetch("https://skillbridge-d7z9.onrender.com/api/ask/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: combinedPrompt }),
      });
      const data = await response.json();
      const reply = data.answer || data.error || "No response";
      setAnswer(reply);
      setHistory([...history, { q: prompt, a: reply }]);
      speak(reply);
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setAnswer("Something went wrong while fetching from AI.");
    }
    setLoading(false);
  };

//   const toggleListening = () => {
//     if (!('webkitSpeechRecognition' in window)) {
//       alert("Your browser doesn't support voice recognition.");
//       return;
//     }
//     const recognition = new window.webkitSpeechRecognition();
//     recognition.lang = 'en-US';
//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setQuestion(transcript);
//       askAI(transcript);
//     };
//     recognition.onend = () => setListening(false);
//     recognition.start();
//     setListening(true);
//   };
const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Your browser doesn't support voice recognition.");
      return;
    }
  
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
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
  
    recognition.onend = () => {
      setListening(false);
    };
  
    setListening(true);
    recognition.start();
    console.log("🛑 Stopped listening");
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center text-center p-6 animate-fade-in">
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">🎭 Roleplay with Gemini AI</h2>

        <div className="mb-4 flex flex-col md:flex-row justify-center gap-4">
          <label className="text-lg">Mode:</label>
          <button onClick={() => setMode("chat")} disabled={mode === "chat"} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
            💬 Chat
          </button>
          <button onClick={() => setMode("talk")} disabled={mode === "talk"} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
            🎤 Talk
          </button>
        </div>

        <div className="mb-4">
          <label className="text-lg mr-2">Roleplay As:</label>
          <select value={role} onChange={e => setRole(e.target.value)} className="p-2 border rounded">
            <option value="interviewer">Job Interviewer</option>
            <option value="customer">Customer</option>
            <option value="teacher">Teacher</option>
            <option value="friend">Friend</option>
          </select>
        </div>

        <textarea
          rows={3}
          className="w-full p-3 border rounded text-gray-800 mb-4"
          placeholder="Type your response..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <div className="mb-6">
          {mode === "chat" ? (
            <button
              onClick={() => askAI()}
              disabled={loading}
              className="px-4 py-2 bg-blue-700 text-white rounded mr-2 hover:bg-blue-800 disabled:opacity-50"
            >
              {loading ? "🤔 Thinking..." : "💬 Ask AI"}
            </button>
          ) : (
            <button
              onClick={toggleListening}
              disabled={loading || listening}
              className="px-4 py-2 bg-blue-700 text-white rounded mr-2 hover:bg-blue-800 disabled:opacity-50"
            >
              {listening ? "🎙️ Listening..." : "🎤 Talk to AI"}
            </button>
          )}

          <button
            onClick={stopSpeaking}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            🛑 Stop Voice
          </button>
        </div>

        {answer && (
          <div className="bg-gray-100 p-4 rounded shadow text-left">
            <strong className="block mb-2">AI:</strong>
            <p className="whitespace-pre-wrap leading-relaxed text-gray-800">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

 // // Chat.js
// import React, { useState, useEffect } from "react";

// export default function Chat() {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [listening, setListening] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [utterance, setUtterance] = useState(null);
//   const [mode, setMode] = useState("chat"); // chat or talk
//   const [role, setRole] = useState("interviewer");
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
//   }, []);

//   const speak = (text) => {
//     const u = new SpeechSynthesisUtterance(text);
//     const voices = speechSynthesis.getVoices();
//     const preferredVoice = voices.find(v =>
//       v.name === "Daniel" || v.name === "Samantha" || v.name === "Karen"
//     );
//     if (preferredVoice) u.voice = preferredVoice;
//     u.pitch = 1.1;
//     u.rate = 0.9;
//     speechSynthesis.speak(u);
//     setUtterance(u);
//   };

//   const stopSpeaking = () => {
//     speechSynthesis.cancel();
//     setUtterance(null);
//   };

//   const askAI = async (q) => {
//     const prompt = q || question;
//     setLoading(true);

//     const fullContext = history.map(h => `You: ${h.q}\nAI: ${h.a}`).join("\n");
//     const roleplayIntro = `You are roleplaying as a friendly ${role}. Speak clearly and ask questions like in real life.`;
//     const combinedPrompt = `${roleplayIntro}\n${fullContext}\nYou: ${prompt}\nAI:`;

//     try {
//       const response = await fetch("https://skillbridge-d7z9.onrender.com/api/ask/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ question: combinedPrompt }),
//       });
//       const data = await response.json();
//       const reply = data.answer || data.error || "No response";
//       setAnswer(reply);
//       setHistory([...history, { q: prompt, a: reply }]);
//       speak(reply);
//     } catch (err) {
//       console.error("❌ Fetch error:", err);
//       setAnswer("Something went wrong while fetching from AI.");
//     }
//     setLoading(false);
//   };

//   const toggleListening = () => {
//     if (!('webkitSpeechRecognition' in window)) {
//       alert("Your browser doesn't support voice recognition.");
//       return;
//     }
//     const recognition = new window.webkitSpeechRecognition();
//     recognition.lang = 'en-US';
//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setQuestion(transcript);
//       askAI(transcript);
//     };
//     recognition.onend = () => setListening(false);
//     recognition.start();
//     setListening(true);
//   };

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>🎭 Roleplay with Gemini AI</h2>

//       <div style={{ marginBottom: "1rem" }}>
//         <label>Mode: </label>
//         <button onClick={() => setMode("chat")} disabled={mode === "chat"}>💬 Chat</button>
//         <button onClick={() => setMode("talk")} disabled={mode === "talk"}>🎤 Talk</button>
//       </div>

//       <div style={{ marginBottom: "1rem" }}>
//         <label>Roleplay As: </label>
//         <select value={role} onChange={e => setRole(e.target.value)}>
//           <option value="interviewer">Job Interviewer</option>
//           <option value="customer">Customer</option>
//           <option value="teacher">Teacher</option>
//           <option value="friend">Friend</option>
//         </select>
//       </div>

//       <textarea
//         rows={3}
//         style={{ width: "100%", fontSize: "1rem", padding: "0.5rem" }}
//         placeholder="Type your response..."
//         value={question}
//         onChange={(e) => setQuestion(e.target.value)}
//       />

//       <div style={{ marginTop: "1rem" }}>
//         {mode === "chat" ? (
//           <button
//             onClick={() => askAI()}
//             disabled={loading}
//             style={{ marginRight: "1rem" }}
//           >
//             {loading ? "🤔 Thinking..." : "💬 Ask AI"}
//           </button>
//         ) : (
//           <button
//             onClick={toggleListening}
//             disabled={loading || listening}
//             style={{ marginRight: "1rem" }}
//           >
//             {listening ? "🎙️ Listening..." : "🎤 Talk to AI"}
//           </button>
//         )}

//         <button onClick={stopSpeaking}>🛑 Stop Voice</button>
//       </div>

//       {answer && (
//         <div style={{ marginTop: "1.5rem", background: "#f8f9fa", padding: "1.2rem", borderRadius: "10px", lineHeight: "1.6", fontSize: "1.1rem", whiteSpace: "pre-wrap" }}>
//           <strong style={{ display: "block", marginBottom: "0.5rem" }}>AI:</strong>
//           {answer}
//         </div>
//       )}
//     </div>
//   );
// } 