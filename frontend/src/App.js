// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Chat from "./Chat";

function Lessons() {
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

function Home() {
  const navigate = useNavigate();

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

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Welcome to SkillBridge</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        Empowering inclusive skill building — one step at a time.
      </p>
      <div style={{ marginTop: "2rem" }}>
        <button onClick={() => navigate("/chat")} style={bigBtnStyle}>💬 Start Roleplay</button>
        <button onClick={() => navigate("/lessons")} style={bigBtnStyle}>📚 Start Learning</button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/lessons" element={<Lessons />} />
      </Routes>
    </Router>
  );
}
