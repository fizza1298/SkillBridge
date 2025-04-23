// App.js
import React, { useEffect, useState } from "react";
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
          className="emoji-float"
          style={{ left: e.left }}
        >
          {e.symbol}
        </span>
      ))}
    </div>
  );
}

// function Home() {
//   const navigate = useNavigate();

//   return (
//     <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center text-center p-6 animate-fade-in">
//       <FloatingEmojis />
//       <div className="large-cursor relative min-h-screen ...">

//       <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4">
//         Welcome to <span className="text-blue-500">SkillBridge</span>
//       </h1>
//       <p className="text-lg md:text-xl text-gray-700 max-w-xl mb-8">
//         Empowering inclusive skill-building — one step at a time.
//       </p>

//       <div className="flex flex-col md:flex-row gap-4 z-10">
//         <button
//           onClick={() => navigate("/chat")}
//           className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition duration-200"
//         >
//           💬 Start Roleplay
//         </button>
//         <button
//           onClick={() => navigate("/lessons")}
//           className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition duration-200"
//         >
//           📚 Start Learning
//         </button>
//       </div>
//     </div>
//   );
// }
function Home() {
  const navigate = useNavigate();
  return (
    <div className="large-cursor relative min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center text-center p-6 animate-fade-in">
      <FloatingEmojis />
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4">
        Welcome to <span className="text-blue-500">SkillBridge</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-700 max-w-xl mb-8">
        Empowering inclusive skill-building — one step at a time.
      </p>

      <div className="flex flex-col md:flex-row gap-4 z-10">
        <button
          onClick={() => navigate("/chat")}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition duration-200"
        >
          💬 Start Roleplay
        </button>
        <button
          onClick={() => navigate("/lessons")}
          className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition duration-200"
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
      </Routes>
    </Router>
  );
}
// // App.js
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Chat from "./Chat";

// function Lessons() {
//   const bigBtnStyle = {
//     margin: "1rem",
//     padding: "1.2rem 2rem",
//     backgroundColor: "#3b82f6",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     fontSize: "1.2rem",
//     cursor: "pointer",
//   };

//   const lessons = [
//     { title: "Reading a Roster", emoji: "🗓️" },
//     { title: "Writing an Email", emoji: "✉️" },
//     { title: "Asking for Help", emoji: "🙋" },
//   ];

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>Lessons</h2>
//       <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>
//         {lessons.map((lesson, index) => (
//           <button
//             key={index}
//             style={{
//               ...bigBtnStyle,
//               textAlign: "left",
//               display: "flex",
//               alignItems: "center",
//               fontSize: "1.1rem",
//             }}
//             onClick={() => alert(`${lesson.title} coming soon!`)}
//           >
//             <span style={{ fontSize: "1.5rem", marginRight: "1rem" }}>{lesson.emoji}</span>
//             {lesson.title}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";

// function FloatingEmojis() {
//   const [emojis, setEmojis] = useState([]);

//   useEffect(() => {
//     const emojiList = ["🧠", "💡", "📚", "📝", "📖"];
//     const interval = setInterval(() => {
//       const newEmoji = {
//         id: Date.now(),
//         symbol: emojiList[Math.floor(Math.random() * emojiList.length)],
//         left: Math.random() * 100 + "%",
//       };
//       setEmojis((prev) => [...prev, newEmoji]);
//       setTimeout(() => {
//         setEmojis((prev) => prev.filter((e) => e.id !== newEmoji.id));
//       }, 3000); // Remove after animation ends
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="absolute inset-0 overflow-hidden z-0">
//       {emojis.map((e) => (
//         <span
//           key={e.id}
//           className="emoji-float"
//           style={{ left: e.left }}
//         >
//           {e.symbol}
//         </span>
//       ))}
//     </div>
//   );
// }

// function Home() {
//   const navigate = useNavigate();

//   return (
//     <div className="animate-fade-in">
//       <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center text-center p-6">
//     <FloatingEmojis />
//     {/* your header/buttons below */}
//   </div>
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center text-center p-6">
//       <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4">
//         Welcome to <span className="text-blue-500">SkillBridge</span>
//       </h1>
//       <p className="text-lg md:text-xl text-gray-700 max-w-xl mb-8">
//         Empowering inclusive skill-building — one step at a time.
//       </p>

//       <div className="flex flex-col md:flex-row gap-4">
//         <button
//           onClick={() => navigate("/chat")}
//           className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition duration-200"
//         >
//           💬 Start Roleplay
//         </button>
//         <button
//           onClick={() => navigate("/lessons")}
//           className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition duration-200"
//         >
//           📚 Start Learning
//         </button>
//       </div>
//     </div>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/chat" element={<Chat />} />
//         <Route path="/lessons" element={<Lessons />} />
//       </Routes>
//     </Router>
//   );
// }
