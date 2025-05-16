import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserId } from "./userId";

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
  return data.answers || {};
}


export default function EmailQuiz() {
 const navigate = useNavigate();
 const quizKey = "email_quiz";


 const questions = [
   {
     question: "What is the purpose of a subject line in an email?",
     options: [
       "To write your full name",
       "To tell the reader what the email is about",
       "To include emojis",
       "To say thank you",
     ],
     answer: 1,
   },
   {
     question: "Which of these is a professional greeting?",
     options: [
       "Hey buddy!",
       "Yo!",
       "Dear Hiring Manager,",
       "Sup?",
     ],
     answer: 2,
   },
   {
     question: "What should go at the end of a professional email?",
     options: [
       "Your favorite quote",
       "A joke",
       "A closing and your name",
       "Nothing at all",
     ],
     answer: 2,
   },
 ];


 const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));
 const [showResults, setShowResults] = useState(false);
 
// Load answers from backend when component mounts
  useEffect(() => {
    loadQuizAnswers(quizKey).then((saved) => {
      if (saved && Array.isArray(saved) && saved.length === questions.length) {
        setUserAnswers(saved);
      }
    });
    // eslint-disable-next-line
  }, []);

  

  

 const handleSelect = (qIndex, optionIndex) => {
   const updatedAnswers = [...userAnswers];
   updatedAnswers[qIndex] = optionIndex;
   setUserAnswers(updatedAnswers);
 };


 const handleSubmit = () => {
  saveQuizAnswers(quizKey, userAnswers);
  setShowResults(true);
};

 const getScore = () => {
   return userAnswers.reduce((score, answer, index) => {
     return answer === questions[index].answer ? score + 1 : score;
   }, 0);
 };


 return (
   <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-6 flex flex-col items-center animate-fade-in">
     <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4 text-center">
       🎓 Email Lesson Quiz
     </h1>


     <p className="text-lg md:text-xl text-gray-700 max-w-3xl text-center mb-6">
       Answer the following questions to check your understanding.
     </p>


     <div className="w-full max-w-4xl space-y-6">
       {questions.map((q, qIndex) => (
         <div key={qIndex} className="bg-white shadow-md rounded-lg p-4">
           <h2 className="text-xl font-semibold text-blue-700 mb-2">{q.question}</h2>
           <ul className="space-y-2">
             {q.options.map((option, optionIndex) => (
               <li key={optionIndex}>
                 <label className="flex items-center space-x-2 cursor-pointer">
                   <input
                     type="radio"
                     name={`question-${qIndex}`}
                     checked={userAnswers[qIndex] === optionIndex}
                     onChange={() => handleSelect(qIndex, optionIndex)}
                     className="form-radio text-blue-600"
                   />
                   <span className="text-gray-800">{option}</span>
                 </label>
               </li>
             ))}
           </ul>
           {showResults && (
             <p className={`mt-2 font-medium ${userAnswers[qIndex] === q.answer ? 'text-green-600' : 'text-red-600'}`}>
               {userAnswers[qIndex] === q.answer ? '✅ Correct' : `❌ Incorrect. Correct answer: ${q.options[q.answer]}`}
             </p>
           )}
         </div>
       ))}
     </div>


     {!showResults ? (
       <button
         onClick={handleSubmit}
         className="mt-6 px-6 py-3 bg-green-600 text-white font-medium rounded-xl shadow hover:bg-green-700 transition duration-200"
       >
         ✅ Submit Answers
       </button>
     ) : (
       <div className="mt-6 text-center">
         <p className="text-xl text-blue-800 font-semibold mb-4">
           You scored {getScore()} out of {questions.length}
         </p>
         <div className="flex flex-col md:flex-row gap-4 justify-center">
           <button
             onClick={() => navigate("/lessons/email")}
             className="px-6 py-3 bg-gray-500 text-white font-medium rounded-xl shadow hover:bg-gray-600 transition duration-200"
           >
             🔙 Review Lesson
           </button>
           <button
             onClick={() => navigate("/lessons")}
             className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition duration-200"
           >
             ⏭️ Back to Lessons
           </button>
         </div>
       </div>
     )}
   </div>
 );
}