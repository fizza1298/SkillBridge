import React, { useEffect, useState } from "react";
import { getUserId, getUserName, setUserName as saveUserName } from "./userId";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Chat from "./Chat";
import RosterLesson from "./Roster_Lesson";
import RosterQuestions from "./RosterQuestions";
import Email from "./Email";
import EmailQuiz from "./EmailQuiz";
import AskForHelp from "./AskForHelp";

// Modal component for name input
function NameModal({ open, onSubmit }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (open) setName("");
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Welcome!</h2>
        <p className="mb-4 text-gray-700">Please enter your name to get started:</p>
        <input
          className="border rounded px-4 py-2 w-full mb-4"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          autoFocus
        />
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          onClick={() => {
            if (name.trim()) onSubmit(name.trim());
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

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
      onClick: () => navigate("/lessons/email"),
    },
    {
      title: "Asking for Help",
      emoji: "🙋",
      onClick: () => navigate("/lessons/ask-for-help"),
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
      {/* Back to Home button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-xl shadow transition duration-200"
        >
          🔙 Back to Home
        </button>
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

function Home({ userName }) {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center text-center p-6 animate-fade-in">
      <FloatingEmojis />
      <h1 className="text-5xl font-extrabold text-blue-800 mb-4">
        Welcome to <span className="text-blue-500">SkillBridge</span>
      </h1>
      {userName && (
        <p className="text-2xl text-blue-700 mb-4">Hello, {userName}!</p>
      )}
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
  const [userName, setUserNameState] = useState(getUserName() || "");
  const [showNameModal, setShowNameModal] = useState(!getUserName());

  useEffect(() => {
    getUserId(); // Ensure user ID exists
  }, []);

  const handleNameSubmit = (name) => {
    saveUserName(name);
    setUserNameState(name);
    setShowNameModal(false);
  };

  return (
    <>
      <NameModal open={showNameModal} onSubmit={handleNameSubmit} />
      <Router>
        <Routes>
          <Route path="/" element={<Home userName={userName} />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/lessons/roster" element={<RosterLesson />} />
          <Route path="/lessons/roster-questions" element={<RosterQuestions />} />
          <Route path="/lessons/email" element={<Email />} />
          <Route path="/lessons/email-quiz" element={<EmailQuiz />} />
          <Route path="/lessons/ask-for-help" element={<AskForHelp />} />
        </Routes>
      </Router>
    </>
  );
}