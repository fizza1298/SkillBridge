import React from "react";
import { useNavigate } from "react-router-dom";

export default function RosterLesson() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 flex flex-col items-center animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4 text-center">
        🗓️ Reading a Roster
      </h1>
      <p className="text-lg md:text-xl text-gray-700 max-w-3xl text-center mb-6">
        Understanding your work schedule helps you plan ahead. Let's walk through an example roster and learn how to interpret your shifts.
      </p>

      <div className="w-full max-w-5xl mb-10 shadow-lg rounded-xl overflow-hidden border border-gray-200">
        <img
          src="/explained_roster_2.png"
          alt="Explained Roster"
          className="w-full object-cover rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:ring-2 hover:ring-blue-400"
        />
        <div className="p-4 bg-white">
          <p className="text-gray-600">
            This image breaks down the key sections of a roster: staff names, roles (e.g., FOH - front of house), shift timings, days off, and leave notices. Take note of color coding to easily identify roles and availability.
          </p>
        </div>
      </div>

      <div className="w-full max-w-5xl mb-10 shadow-lg rounded-xl overflow-hidden border border-gray-200">
        <img
          src="/roster.png"
          alt="Sample Roster"
          className="w-full object-cover rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:ring-2 hover:ring-blue-400"
        />
        <div className="p-4 bg-white">
          <p className="text-gray-600">
            Try answering these:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>What time does Erin Harlen start work on Friday?</li>
            <li>Which days is Jacob Chapman not available?</li>
            <li>Who has a support role on Wednesday?</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={() => navigate("/lessons")}
          className="px-6 py-3 bg-gray-500 text-white font-medium rounded-xl shadow hover:bg-gray-600 transition duration-200"
        >
          🔙 Back to Lessons
        </button>

        <button
          onClick={() => navigate("/lessons/roster-questions")}
          className="px-6 py-3 bg-green-600 text-white font-medium rounded-xl shadow hover:bg-green-700 transition duration-200"
        >
          🎓 Try Questions
        </button>
      </div>
    </div>
  );
}

// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function RosterLesson() {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 flex flex-col items-center animate-fade-in">
//       <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4 text-center">
//         🗓️ Reading a Roster
//       </h1>
//       <p className="text-lg md:text-xl text-gray-700 max-w-3xl text-center mb-6">
//         Understanding your work schedule helps you plan ahead. Let's walk through an example roster and learn how to interpret your shifts.
//       </p>

//       <div className="w-full max-w-5xl mb-10 shadow-lg rounded-xl overflow-hidden border border-gray-200">
//         <img
//           src="/explained_roster_2.png"
//           alt="Explained Roster"
//           className="w-full object-cover rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
//         />
//         <div className="p-4 bg-white">
//           <p className="text-gray-600">
//             This image breaks down the key sections of a roster: staff names, roles (e.g., FOH - front of house), shift timings, days off, and leave notices. Take note of color coding to easily identify roles and availability.
//           </p>
//         </div>
//       </div>

//       <div className="w-full max-w-5xl mb-10 shadow-lg rounded-xl overflow-hidden border border-gray-200">
//         <img
//           src="/roster.png"
//           alt="Sample Roster"
//           className="w-full object-cover rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
//         />
//         <div className="p-4 bg-white">
//           <p className="text-gray-600">
//             Try answering these:
//           </p>
//           <ul className="list-disc list-inside text-gray-700 mt-2">
//             <li>What time does Erin Harlen start work on Friday?</li>
//             <li>Which days is Jacob Chapman not available?</li>
//             <li>Who has a support role on Wednesday?</li>
//           </ul>
//         </div>
//       </div>

//       <button
//         onClick={() => navigate("/lessons")}
//         className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition duration-200"
//       >
//         🔙 Back to Lessons
//       </button>
//     </div>
//   );
// }
