import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Welcome to SkillBridge</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        Empowering inclusive skill building — one step at a time.
      </p>
      <div style={{ marginTop: "2rem" }}>
        <button onClick={() => navigate("/lessons")} style={bigBtnStyle}>
          📚 Start Learning
        </button>
        <button onClick={() => navigate("/chat")} style={bigOutlineBtnStyle}>
          💬 Chat with AI
        </button>
      </div>
    </div>
  );
}

function Lessons() {
  const lessons = [
    { title: "Reading a Roster", emoji: "🗓️" },
    { title: "Writing an Email", emoji: "✉️" },
    { title: "Asking for Help", emoji: "🙋" },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Lessons</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>
        {lessons.map((lesson, index) => (
          <button
            key={index}
            style={{
              ...bigBtnStyle,
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              fontSize: "1.1rem",
            }}
            onClick={() => alert(`${lesson.title} coming soon!`)}
          >
            <span style={{ fontSize: "1.5rem", marginRight: "1rem" }}>{lesson.emoji}</span>
            {lesson.title}
          </button>
        ))}
      </div>
    </div>
  );
}

// function Chat() {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [listening, setListening] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const askAI = async (q) => {
//     setLoading(true);
//     try {
//       const prompt = q || question;
//       const response = await fetch("https://skillbridge-d7z9.onrender.com/api/ask/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ question: prompt }),
//       });
//       const data = await response.json();
//       const reply = data.answer || data.error || "No response";
//       setAnswer(reply);
//       speak(reply);
//     } catch (err) {
//       console.error("❌ Failed to fetch AI response:", err);
//       setAnswer("Something went wrong while fetching from AI.");
//     }
//     setLoading(false);
//   };
//   const [utterance, setUtterance] = useState(null);
//   const speak = (text) => {
//     const utterance = new SpeechSynthesisUtterance(text);
//     speechSynthesis.speak(utterance);
//     setUtterance(u);
//   };
//   const stopSpeaking = () => {
//     speechSynthesis.cancel();
//     setUtterance(null);
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
//       <h2>Chat with Gemini AI</h2>
//       <textarea
//         rows={3}
//         style={{ width: "100%", fontSize: "1rem", padding: "0.5rem" }}
//         placeholder="Type or speak your question..."
//         value={question}
//         onChange={(e) => setQuestion(e.target.value)}
//       />
//       <div style={{ marginTop: "1rem" }}>
//         <button
//           onClick={() => askAI()}
//           disabled={loading}
//           style={{
//             ...bigBtnStyle,
//             opacity: loading ? 0.6 : 1,
//             cursor: loading ? "not-allowed" : "pointer",
//           }}
//         >
//           {loading ? "🤔 Thinking..." : "💬 Ask AI"}
//         </button>

//         <button onClick={toggleListening} style={bigOutlineBtnStyle}>
//           {listening ? "🎙️ Listening..." : "🎤 Talk to AI"}
//         </button>
//         <button onClick={stopSpeaking}
//         style={{ ...bigOutlineBtnStyle, marginLeft: "1rem" }}>
//         🛑 Stop Voice
//       </button>

//       </div>
//       {answer && (
//         <div style={{ marginTop: "1.5rem", background: "#f0f0f0", padding: "1rem", borderRadius: "6px" }}>
//           <strong>Answer:</strong>
//           <p>{answer && (
//             <div
//               style={{
//                 marginTop: "1.5rem",
//                 background: "#f8f9fa",
//                 padding: "1.2rem",
//                 borderRadius: "10px",
//                 lineHeight: "1.6",
//                 fontSize: "1.1rem",
//                 whiteSpace: "pre-wrap", // Preserve line breaks
//               }}
//             >
//               <strong style={{ display: "block", marginBottom: "0.5rem" }}>Answer:</strong>
//               {answer}
//             </div>
//           )}
// </p>
//         </div>
//       )}
//     </div>
//   );
// }

function Chat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [utterance, setUtterance] = useState(null);

  const askAI = async (q) => {
    setLoading(true);
    try {
      const prompt = q || question;
      const response = await fetch("https://skillbridge-d7z9.onrender.com/api/ask/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: `Explain like I'm five: ${prompt}` }),
      });
      const data = await response.json();
      const reply = data.answer || data.error || "No response";
      setAnswer(reply);
      speak(reply);
    } catch (err) {
      console.error("❌ Failed to fetch AI response:", err);
      setAnswer("Something went wrong while fetching from AI.");
    }
    setLoading(false);
  };

  const speak = (text) => {
    const u = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(u);
    setUtterance(u);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setUtterance(null);
  };

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
    recognition.onend = () => setListening(false);
    recognition.start();
    setListening(true);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Chat with Gemini AI</h2>
      <textarea
        rows={3}
        style={{ width: "100%", fontSize: "1rem", padding: "0.5rem" }}
        placeholder="Type or speak your question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={() => askAI()}
          disabled={loading}
          style={{
            ...bigBtnStyle,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "🤔 Thinking..." : "💬 Ask AI"}
        </button>

        <button onClick={toggleListening} style={bigOutlineBtnStyle}>
          {listening ? "🎙️ Listening..." : "🎤 Talk to AI"}
        </button>

        <button onClick={stopSpeaking} style={{ ...bigOutlineBtnStyle, marginLeft: "1rem" }}>
          🛑 Stop Voice
        </button>
      </div>

      {answer && (
        <div
          style={{
            marginTop: "1.5rem",
            background: "#f8f9fa",
            padding: "1.2rem",
            borderRadius: "10px",
            lineHeight: "1.6",
            fontSize: "1.1rem",
            whiteSpace: "pre-wrap",
          }}
        >
          <strong style={{ display: "block", marginBottom: "0.5rem" }}>Answer:</strong>
          {answer}
        </div>
      )}
    </div>
  );
}

const bigBtnStyle = {
  margin: "1rem",
  padding: "1.2rem 2rem",
  backgroundColor: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "1.2rem",
  cursor: "pointer",
};

const bigOutlineBtnStyle = {
  ...bigBtnStyle,
  backgroundColor: "white",
  color: "#3b82f6",
  border: "2px solid #3b82f6",
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}