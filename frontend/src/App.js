import React, { useEffect, useState } from "react";
import { getUserId, getUserName, setUserName } from "./userId";
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

function Home( {userName} ) {
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
  const [userName, setUserNameState] = useState(getUserName());

  useEffect(() => {
    getUserId(); // Ensure user ID exists
    if (!userName) {
      // Prompt for name if not set
      let name = "";
      while (!name) {
        name = window.prompt("Welcome! What's your name?");
        if (name) {
          setUserName(name);
          setUserNameState(name);
        }
      }
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home userName={userName} />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/lessons/roster" element={<RosterLesson />} />
        <Route path="/lessons/roster-questions" element={<RosterQuestions />} />
        <Route path="/lessons/email" element={<Email />} />
        <Route path="/lessons/email-quiz" element={<EmailQuiz />} />
      </Routes>
    </Router>
  );
}
