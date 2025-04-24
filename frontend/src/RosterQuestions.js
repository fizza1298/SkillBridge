import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RosterQuestions() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({
    erin: "",
    jacob: "",
    support: "",
  });

  const correctAnswers = {
    erin: "9am",
    jacob: "monday and tuesday",
    support: "isabelle king",
  };

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const checkAnswers = () => {
    const result = Object.entries(answers).map(([key, value]) => {
      const correct = correctAnswers[key].toLowerCase();
      return value.toLowerCase().includes(correct)
        ? `✅ ${key} - Correct`
        : `❌ ${key} - Try again`;
    });
    alert(result.join("\n"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-6 flex flex-col items-center animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4 text-center">
        🎓 Roster Questions
      </h1>

      <p className="text-lg md:text-xl text-gray-700 max-w-2xl text-center mb-8">
        Use the roster image and answer the questions below. Test your understanding!
      </p>

      <div className="w-full max-w-2xl bg-white shadow-xl rounded-xl p-6 space-y-6">
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            🔎 What time does Erin Harlen start work on Friday?
          </label>
          <input
            name="erin"
            value={answers.erin}
            onChange={handleChange}
            placeholder="Type your answer..."
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">
            🔎 Which days is Jacob Chapman not available?
          </label>
          <input
            name="jacob"
            value={answers.jacob}
            onChange={handleChange}
            placeholder="Type your answer..."
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">
            🔎 Who has a support role on Wednesday?
          </label>
          <input
            name="support"
            value={answers.support}
            onChange={handleChange}
            placeholder="Type your answer..."
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          onClick={checkAnswers}
          className="mt-4 px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition duration-200"
        >
          ✅ Check Answers
        </button>
      </div>

      <button
        onClick={() => navigate("/lessons/roster")}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition duration-200"
      >
        🔙 Back to Lesson
      </button>
    </div>
  );
}