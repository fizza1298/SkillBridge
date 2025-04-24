// App.js
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Chat from "./Chat";
import RosterLesson from "./Roster_Lesson";
import RosterQuestions from "./RosterQuestions";

function Lessons() {
  const navigate = useNavigate();

  const lessons = [
    {
      title: "Reading a Roster",
      emoji: "🗓️",
      onClick: () => navigate("/lessons/roster"),
    },
    {
      title: "Writing an Email",
      emoji: "✉️",
      onClick: () => alert("Lesson coming soon!"),
    },
    {
      title: "Asking for Help",
      emoji: "🙋",
      onClick: () => alert("Lesson coming soon!"),
    },
  ];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-white to-blue-50">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Lessons</h2>
      <div className="flex flex-col gap-4 items-center">
        {lessons.map((lesson, index) => (
          <button
            key={index}
            onClick={lesson.onClick}
            className="w-full max-w-xl flex items-center justify-start px-6 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg rounded-2xl shadow-md transition-transform transform hover:scale-105"
          >
            <span className="text-2xl mr-4">{lesson.emoji}</span>
            {lesson.title}
          </button>
        ))}
      </div>
    </div>
  );
}

function FloatingEmojis() {
  const [emojis, setEmojis] = useState([]);

  useEffect(() => {
    const emojiList = ["🧠", "💡", "📚", "📝", "📖"];
    const interval = setInterval(() => {
      const newEmoji = {
        id: Date.now(),
        symbol: emojiList[Math.floor(Math.random() * emojiList.length)],
        left: Math.random() * 100 + "%",
      };
      setEmojis((prev) => [...prev, newEmoji]);
      setTimeout(() => {
        setEmojis((prev) => prev.filter((e) => e.id !== newEmoji.id));
      }, 3000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {emojis.map((e) => (
        <span
          key={e.id}
          className="emoji-float text-4xl absolute bottom-0 animate-float"
          style={{ left: e.left }}
        >
          {e.symbol}
        </span>
      ))}
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center text-center p-6 animate-fade-in">
      <FloatingEmojis />
      <h1 className="text-5xl font-extrabold text-blue-800 mb-4">
        Welcome to <span className="text-blue-500">SkillBridge</span>
      </h1>
      <p className="text-xl text-gray-700 max-w-xl mb-8">
        Empowering inclusive skill-building — one step at a time.
      </p>
      <div className="flex flex-col md:flex-row gap-4 z-10">
        <button
          onClick={() => navigate("/chat")}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition duration-200"
        >
          💬 Start Roleplay
        </button>
        <button
          onClick={() => navigate("/lessons")}
          className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition duration-200"
        >
          📚 Start Learning
        </button>
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
        <Route path="/lessons/roster" element={<RosterLesson />} />
        <Route path="/lessons/roster-questions" element={<RosterQuestions />} />
      </Routes>
    </Router>
  );
}
