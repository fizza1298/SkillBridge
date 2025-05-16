import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserId } from "./userId";

// Helper: keys for consistent order
const answerKeys = ["erin", "jacob", "support"];

// Convert object to list for backend
function answersObjectToList(obj) {
  return answerKeys.map((key) => obj[key] || "");
}

// Convert list from backend to object
function answersListToObject(arr) {
  return {
    erin: arr[0] || "",
    jacob: arr[1] || "",
    support: arr[2] || "",
  };
}

async function saveQuizAnswers(quizKey, answers) {
  const userId = getUserId();
  await fetch(`/api/quiz/${quizKey}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-User-Id": userId,
    },
    body: JSON.stringify({ answers }),
  });
}

async function loadQuizAnswers(quizKey) {
  const userId = getUserId();
  const res = await fetch(`/api/quiz/${quizKey}/`, {
    headers: { "X-User-Id": userId },
  });
  const data = await res.json();
  return data.answers || [];
}

export default function RosterQuestions() {
  const navigate = useNavigate();
  const quizKey = "roster_questions";
  const [answers, setAnswers] = useState({
    erin: "",
    jacob: "",
    support: "",
  });
  const [showResults, setShowResults] = useState(false);

  const correctAnswers = {
    erin: "9am",
    jacob: "monday and tuesday",
    support: "isabelle king",
  };

  // Load saved answers on mount
  useEffect(() => {
    loadQuizAnswers(quizKey).then((saved) => {
      if (Array.isArray(saved) && saved.length === answerKeys.length) {
        setAnswers(answersListToObject(saved));
      }
    });
    // eslint-disable-next-line
  }, []);

  // Auto-save answers on change
  const handleSubmit = () => {
  saveQuizAnswers(quizKey, answersObjectToList(answers));
  setShowResults(true);
};


  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const isCorrect = (key) => {
    if (
      typeof answers[key] !== "string" ||
      typeof correctAnswers[key] !== "string"
    ) {
      return false;
    }
    return answers[key].toLowerCase().includes(correctAnswers[key].toLowerCase());
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
            disabled={showResults}
          />
          {showResults && (
            <p className={`mt-2 font-medium ${isCorrect("erin") ? "text-green-600" : "text-red-600"}`}>
              {isCorrect("erin")
                ? "✅ Correct"
                : `❌ Incorrect. Correct answer: ${correctAnswers.erin}`}
            </p>
          )}
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
            disabled={showResults}
          />
          {showResults && (
            <p className={`mt-2 font-medium ${isCorrect("jacob") ? "text-green-600" : "text-red-600"}`}>
              {isCorrect("jacob")
                ? "✅ Correct"
                : `❌ Incorrect. Correct answer: ${correctAnswers.jacob}`}
            </p>
          )}
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
            disabled={showResults}
          />
          {showResults && (
            <p className={`mt-2 font-medium ${isCorrect("support") ? "text-green-600" : "text-red-600"}`}>
              {isCorrect("support")
                ? "✅ Correct"
                : `❌ Incorrect. Correct answer: ${correctAnswers.support}`}
            </p>
          )}
        </div>

        {!showResults ? (
          <button
            onClick={handleSubmit}
            className="mt-4 px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition duration-200"
          >
            ✅ Submit Answers
          </button>
        ) : (
          <button
            onClick={() => setShowResults(false)}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition duration-200"
          >
            🔄 Try Again
          </button>
        )}
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