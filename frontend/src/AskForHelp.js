import React from "react";
import { useNavigate } from "react-router-dom";

export default function AskForHelpLesson() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-blue-800 mb-4 text-center">
        Asking for Help
      </h2>

      <p className="text-lg text-gray-700 mb-6 max-w-2xl text-center">
        It's okay to ask for help. You have the right to speak up and let others
        know what you need. Here's how to do it in a clear and confident way!
      </p>

      <div className="bg-white p-6 rounded-2xl shadow-md max-w-xl w-full text-left space-y-4">
        <div>
          <h3 className="font-semibold text-blue-700 text-xl">Step 1: Say What You Need</h3>
          <p className="text-gray-700 mt-1">Be clear about the help you need.</p>
          <div className="bg-blue-100 p-3 rounded-md mt-2">
            <p><strong>Example:</strong> “Can you please help me open this door?”</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-blue-700 text-xl">Step 2: Ask Someone Nearby</h3>
          <p className="text-gray-700 mt-1">Look for a friendly face. You can ask a teacher, staff member, or a friend.</p>
        </div>

        <div>
          <h3 className="font-semibold text-blue-700 text-xl">Step 3: Use Tools If You Want</h3>
          <p className="text-gray-700 mt-1">You can show a note on your phone or use pictures to ask for help.</p>
        </div>

        <div>
          <h3 className="font-semibold text-blue-700 text-xl">Step 4: Say “Thank You”</h3>
          <p className="text-gray-700 mt-1">Most people are happy to help. Saying thank you shows kindness!</p>
        </div>
      </div>

      <button
        onClick={goBack}
        className="mt-8 px-6 py-3 bg-blue-500 text-white font-semibold text-lg rounded-xl hover:bg-blue-600 transition"
      >
        Go Back to Home
      </button>
    </div>
  );
}
