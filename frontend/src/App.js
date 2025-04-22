import React, { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://skillbridge-d7z9.onrender.com/api/ask/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      setAnswer(data.answer || data.error || "No response");
    } catch (err) {
      setAnswer("Something went wrong!");
    }
    setLoading(false);
  };

  const scrollToChat = () => {
    document.getElementById("chatbox").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "2rem", textAlign: "center" }}>
      <h1>Welcome to SkillBridge</h1>
      <p style={{ fontSize: "1.1rem", marginBottom: "2rem" }}>
        Learn at your own pace. Gain confidence, one skill at a time.
      </p>

      <div style={{ marginBottom: "3rem" }}>
        <button
          style={{
            margin: "1rem",
            padding: "1rem 2rem",
            fontSize: "1rem",
            cursor: "pointer",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#3b82f6",
            color: "white",
          }}
          onClick={() => alert("Lesson module coming soon!")}
        >
          📚 Start Learning
        </button>

        <button
          onClick={scrollToChat}
          style={{
            margin: "1rem",
            padding: "1rem 2rem",
            fontSize: "1rem",
            cursor: "pointer",
            borderRadius: "8px",
            border: "1px solid #3b82f6",
            backgroundColor: "white",
            color: "#3b82f6",
          }}
        >
          💬 Ask AI for Help
        </button>
      </div>

      <div id="chatbox" style={{ maxWidth: "600px", margin: "0 auto", textAlign: "left" }}>
        <h2>Ask Gemini AI</h2>
        <textarea
          rows={4}
          style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
          placeholder="Type your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          onClick={askAI}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        {answer && (
          <div style={{ marginTop: "1.5rem", background: "#f9f9f9", padding: "1rem", borderRadius: "6px" }}>
            <strong>Answer:</strong>
            <p>{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
