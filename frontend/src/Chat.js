import React, { useState, useEffect } from "react";

export default function Chat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [mode, setMode] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
  }, []);

  const speak = (text) => {
    const u = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name === "Daniel" || v.name === "Samantha" || v.name === "Karen");
    if (preferredVoice) u.voice = preferredVoice;
    u.pitch = 1.1;
    u.rate = 0.9;
    speechSynthesis.speak(u);
    setUtterance(u);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setUtterance(null);
  };

  const askAI = async (prompt) => {
    setLoading(true);
  
    // Dynamically determine the mode
    const selectedMode = mode === "roleplay" && role ? "feedback" : "explain";
    console.log("🧠 Selected Mode:", selectedMode);
    try {
      const response = await fetch("https://skillbridge-d7z9.onrender.com/api/ask/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: prompt,
          mode: selectedMode
        })
      });
  
      const data = await response.json();
      const reply = data.answer || data.error || "No response";
  
      if (selectedMode === "feedback") {
        setFeedback(reply);  // For roleplay
      } else {
        setAnswer(reply);    // For ask mode
      }
  
      speak(reply);
  
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setAnswer("Something went wrong while fetching from AI.");
    }
  
    setLoading(false);
  };
  
  

  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Your browser doesn't support voice recognition.");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuestion(transcript);
      askAI(transcript);
    };
    recognition.onerror = (e) => {
      console.error("Speech recognition error:", e);
      setListening(false);
    };
    recognition.onend = () => setListening(false);
    setListening(true);
    recognition.start();
  };


  const handleRoleplay = (selectedRole) => {
    setMode("roleplay"); // <-- this is key to make sure selectedMode becomes "feedback"
    setRole(selectedRole);
  
    const prompt =
      selectedRole === "customer"
        ? "Hi, I’m looking for something specific. Can you help me find it?"
        : "Tell me about your performance this week.";
  
    setAnswer(prompt);
    speak(prompt);
    setTimeout(() => toggleListening(), 100);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center text-center p-10 animate-fade-in">
      <div className="w-full max-w-3xl">
        <h2 className="text-4xl font-bold text-blue-800 mb-10">🎭 Roleplay with Gemini AI</h2>

        {!mode && (
          <div className="flex gap-8 mb-12">
            <button onClick={() => setMode("ask")} className="px-8 py-4 bg-blue-600 text-white rounded text-2xl">🔍 Ask</button>
            <button onClick={() => setMode("roleplay")} className="px-8 py-4 bg-green-600 text-white rounded text-2xl">🎭 Roleplay</button>
          </div>
        )}

        {mode === "ask" && (
          <div>
            <textarea
              rows={4}
              className="w-full p-4 border rounded text-gray-800 text-xl mb-6"
              placeholder="Type your question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <div className="flex gap-6 mb-6 justify-center">
              <button onClick={() => askAI(question)} className="px-6 py-3 bg-blue-700 text-white rounded text-lg">💬 Ask AI</button>
              <button onClick={toggleListening} className="px-6 py-3 bg-purple-700 text-white rounded text-lg">🎙️ Listen</button>
              <button onClick={stopSpeaking} className="px-6 py-3 bg-red-600 text-white rounded text-lg">🛑 Stop</button>
            </div>
          </div>
        )}

        {mode === "roleplay" && !role && (
          <div className="flex flex-col items-center gap-6">
            <p className="text-2xl">Choose a role to begin:</p>
            <button onClick={() => handleRoleplay("customer")} className="px-6 py-3 bg-yellow-500 text-white rounded text-lg">🛒 AI as Customer</button>
            <button onClick={() => handleRoleplay("boss")} className="px-6 py-3 bg-indigo-500 text-white rounded text-lg">👔 AI as Boss</button>
          </div>
        )}

        {answer && (
          <div className="bg-gray-100 p-6 mt-6 rounded shadow text-left text-xl">
            <strong className="block mb-3">AI:</strong>
            <p className="whitespace-pre-wrap leading-relaxed text-gray-800">{answer}</p>
          </div>
        )}

        {role && (
          <textarea
            rows={4}
            className="w-full p-4 border rounded text-gray-800 mt-6 text-xl"
            placeholder="Your response..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        )}

        {role && (
          <div className="flex gap-6 mt-4 justify-center">
            <button onClick={() => askAI(question)} className="px-6 py-3 bg-green-600 text-white rounded text-lg">✅ Submit Response</button>
            <button onClick={toggleListening} className="px-6 py-3 bg-purple-700 text-white rounded text-lg">🎙️ Listen</button>
            <button onClick={stopSpeaking} className="px-6 py-3 bg-red-600 text-white rounded text-lg">🛑 Stop</button>
          </div>
        )}

        {feedback && (
          <div className="mt-6 bg-green-100 text-green-900 p-4 text-lg rounded shadow">
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
}
// import React, { useState, useEffect } from "react";

// export default function Chat() {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [mode, setMode] = useState(null);
//   const [role, setRole] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [listening, setListening] = useState(false);
//   const [utterance, setUtterance] = useState(null);

//   useEffect(() => {
//     speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
//   }, []);

//   const speak = (text) => {
//     const u = new SpeechSynthesisUtterance(text);
//     const voices = speechSynthesis.getVoices();
//     const preferredVoice = voices.find(v => v.name === "Daniel" || v.name === "Samantha" || v.name === "Karen");
//     if (preferredVoice) u.voice = preferredVoice;
//     u.pitch = 1.1;
//     u.rate = 0.9;
//     speechSynthesis.speak(u);
//     setUtterance(u);
//   };

//   const stopSpeaking = () => {
//     speechSynthesis.cancel();
//     setUtterance(null);
//   };

//   const askAI = async (prompt) => {
//     setLoading(true);
//     try {
//       const response = await fetch("https://skillbridge-d7z9.onrender.com/api/ask/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ question: prompt })
//       });
//       const data = await response.json();
//       const reply = data.answer || data.error || "No response";
//       setAnswer(reply);
//       speak(reply);
//     } catch (err) {
//       console.error("❌ Fetch error:", err);
//       setAnswer("Something went wrong while fetching from AI.");
//     }
//     setLoading(false);
//   };

//   const toggleListening = () => {
//     if (!('webkitSpeechRecognition' in window)) {
//       alert("Your browser doesn't support voice recognition.");
//       return;
//     }
//     const recognition = new window.webkitSpeechRecognition();
//     recognition.lang = 'en-US';
//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setQuestion(transcript);
//       askAI(transcript);
//     };
//     recognition.onerror = (e) => {
//       console.error("Speech recognition error:", e);
//       setListening(false);
//     };
//     recognition.onend = () => setListening(false);
//     setListening(true);
//     recognition.start();
//   };

//   const handleRoleplay = (selectedRole) => {
//     setRole(selectedRole);
//     if (selectedRole === "customer") {
//       const prompt = "Hi, I’m looking for something specific. Can you help me find it?";
//       setAnswer(prompt);
//       speak(prompt);
//       toggleListening();
//     } else if (selectedRole === "boss") {
//       const prompt = "Tell me about your performance this week.";
//       setAnswer(prompt);
//       speak(prompt);
//       toggleListening();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center text-center p-10 animate-fade-in">
//       <div className="w-full max-w-3xl">
//         <h2 className="text-4xl font-bold text-blue-800 mb-10">🎭 Roleplay with Gemini AI</h2>

//         {!mode && (
//           <div className="flex gap-8 mb-12">
//             <button onClick={() => setMode("ask")} className="px-8 py-4 bg-blue-600 text-white rounded text-2xl">🔍 Ask</button>
//             <button onClick={() => setMode("roleplay")} className="px-8 py-4 bg-green-600 text-white rounded text-2xl">🎭 Roleplay</button>
//           </div>
//         )}

//         {mode === "ask" && (
//           <div>
//             <textarea
//               rows={4}
//               className="w-full p-4 border rounded text-gray-800 text-xl mb-6"
//               placeholder="Type your question..."
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
//             />
//             <div className="flex gap-6 mb-6 justify-center">
//               <button onClick={() => askAI(question)} className="px-6 py-3 bg-blue-700 text-white rounded text-lg">💬 Ask AI</button>
//               <button onClick={toggleListening} className="px-6 py-3 bg-purple-700 text-white rounded text-lg">🎙️ Listen</button>
//               <button onClick={stopSpeaking} className="px-6 py-3 bg-red-600 text-white rounded text-lg">🛑 Stop</button>
//             </div>
//           </div>
//         )}

//         {mode === "roleplay" && !role && (
//           <div className="flex flex-col items-center gap-6">
//             <p className="text-2xl">Choose a role to begin:</p>
//             <button onClick={() => handleRoleplay("customer")} className="px-6 py-3 bg-yellow-500 text-white rounded text-lg">🛒 AI as Customer</button>
//             <button onClick={() => handleRoleplay("boss")} className="px-6 py-3 bg-indigo-500 text-white rounded text-lg">👔 AI as Boss</button>
//           </div>
//         )}

//         {answer && (
//           <div className="bg-gray-100 p-6 mt-6 rounded shadow text-left text-xl">
//             <strong className="block mb-3">AI:</strong>
//             <p className="whitespace-pre-wrap leading-relaxed text-gray-800">{answer}</p>
//           </div>
//         )}

//         {role && (
//           <textarea
//             rows={4}
//             className="w-full p-4 border rounded text-gray-800 mt-6 text-xl"
//             placeholder="Your response..."
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//           />
//         )}

//         {role && (
//           <div className="flex gap-6 mt-4 justify-center">
//             <button onClick={() => askAI(question)} className="px-6 py-3 bg-green-600 text-white rounded text-lg">✅ Submit Response</button>
//             <button onClick={toggleListening} className="px-6 py-3 bg-purple-700 text-white rounded text-lg">🎙️ Listen</button>
//             <button onClick={stopSpeaking} className="px-6 py-3 bg-red-600 text-white rounded text-lg">🛑 Stop</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// // import React, { useState, useEffect } from "react";

// // export default function Chat() {
// //   const [question, setQuestion] = useState("");
// //   const [answer, setAnswer] = useState("");
// //   const [mode, setMode] = useState(null);
// //   const [role, setRole] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [listening, setListening] = useState(false);
// //   const [utterance, setUtterance] = useState(null);

// //   useEffect(() => {
// //     speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
// //   }, []);

// //   const speak = (text) => {
// //     const u = new SpeechSynthesisUtterance(text);
// //     const voices = speechSynthesis.getVoices();
// //     const preferredVoice = voices.find(v => v.name === "Daniel" || v.name === "Samantha" || v.name === "Karen");
// //     if (preferredVoice) u.voice = preferredVoice;
// //     u.pitch = 1.1;
// //     u.rate = 0.9;
// //     speechSynthesis.speak(u);
// //     setUtterance(u);
// //   };

// //   const stopSpeaking = () => {
// //     speechSynthesis.cancel();
// //     setUtterance(null);
// //   };

// //   const askAI = async (prompt) => {
// //     setLoading(true);
// //     try {
// //       const response = await fetch("https://skillbridge-d7z9.onrender.com/api/ask/", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ question: prompt })
// //       });
// //       const data = await response.json();
// //       const reply = data.answer || data.error || "No response";
// //       setAnswer(reply);
// //       speak(reply);
// //     } catch (err) {
// //       console.error("❌ Fetch error:", err);
// //       setAnswer("Something went wrong while fetching from AI.");
// //     }
// //     setLoading(false);
// //   };

// //   const toggleListening = () => {
// //     if (!('webkitSpeechRecognition' in window)) {
// //       alert("Your browser doesn't support voice recognition.");
// //       return;
// //     }
// //     const recognition = new window.webkitSpeechRecognition();
// //     recognition.lang = 'en-US';
// //     recognition.onresult = (event) => {
// //       const transcript = event.results[0][0].transcript;
// //       setQuestion(transcript);
// //       askAI(transcript);
// //     };
// //     recognition.onerror = (e) => {
// //       console.error("Speech recognition error:", e);
// //       setListening(false);
// //     };
// //     recognition.onend = () => setListening(false);
// //     setListening(true);
// //     recognition.start();
// //   };

// //   const handleRoleplay = (selectedRole) => {
// //     setRole(selectedRole);
// //     const questions = {
// //       customer: "How can I help you today?",
// //       boss: "Tell me about your performance this week."
// //     };
// //     const prompt = questions[selectedRole] || "Let's start our roleplay.";
// //     setAnswer(prompt);
// //     speak(prompt);
// //     toggleListening();
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center text-center p-10 animate-fade-in">
// //       <div className="w-full max-w-3xl">
// //         <h2 className="text-4xl font-bold text-blue-800 mb-10">🎭 Roleplay with Gemini AI</h2>

// //         {!mode && (
// //           <div className="flex gap-8 mb-12">
// //             <button onClick={() => setMode("ask")} className="px-8 py-4 bg-blue-600 text-white rounded text-2xl">🔍 Ask</button>
// //             <button onClick={() => setMode("roleplay")} className="px-8 py-4 bg-green-600 text-white rounded text-2xl">🎭 Roleplay</button>
// //           </div>
// //         )}

// //         {mode === "ask" && (
// //           <div>
// //             <textarea
// //               rows={4}
// //               className="w-full p-4 border rounded text-gray-800 text-xl mb-6"
// //               placeholder="Type your question..."
// //               value={question}
// //               onChange={(e) => setQuestion(e.target.value)}
// //             />
// //             <div className="flex gap-6 mb-6 justify-center">
// //               <button onClick={() => askAI(question)} className="px-6 py-3 bg-blue-700 text-white rounded text-lg">💬 Ask AI</button>
// //               <button onClick={toggleListening} className="px-6 py-3 bg-purple-700 text-white rounded text-lg">🎙️ Listen</button>
// //               <button onClick={stopSpeaking} className="px-6 py-3 bg-red-600 text-white rounded text-lg">🛑 Stop</button>
// //             </div>
// //           </div>
// //         )}

// //         {mode === "roleplay" && !role && (
// //           <div className="flex flex-col items-center gap-6">
// //             <p className="text-2xl">Choose a role to begin:</p>
// //             <button onClick={() => handleRoleplay("customer")} className="px-6 py-3 bg-yellow-500 text-white rounded text-lg">🛒 Customer</button>
// //             <button onClick={() => handleRoleplay("boss")} className="px-6 py-3 bg-indigo-500 text-white rounded text-lg">👔 Boss</button>
// //           </div>
// //         )}

// //         {answer && (
// //           <div className="bg-gray-100 p-6 mt-6 rounded shadow text-left text-xl">
// //             <strong className="block mb-3">AI:</strong>
// //             <p className="whitespace-pre-wrap leading-relaxed text-gray-800">{answer}</p>
// //           </div>
// //         )}

// //         {role && (
// //           <textarea
// //             rows={4}
// //             className="w-full p-4 border rounded text-gray-800 mt-6 text-xl"
// //             placeholder="Your response..."
// //             value={question}
// //             onChange={(e) => setQuestion(e.target.value)}
// //           />
// //         )}

// //         {role && (
// //           <div className="flex gap-6 mt-4 justify-center">
// //             <button onClick={() => askAI(question)} className="px-6 py-3 bg-green-600 text-white rounded text-lg">✅ Submit Response</button>
// //             <button onClick={toggleListening} className="px-6 py-3 bg-purple-700 text-white rounded text-lg">🎙️ Listen</button>
// //             <button onClick={stopSpeaking} className="px-6 py-3 bg-red-600 text-white rounded text-lg">🛑 Stop</button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }// import React, { useState, useEffect } from "react";

// // // export default function Chat() {
// // //   const [question, setQuestion] = useState("");
// // //   const [answer, setAnswer] = useState("");
// // //   const [mode, setMode] = useState(null);
// // //   const [role, setRole] = useState(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const [listening, setListening] = useState(false);
// // //   const [utterance, setUtterance] = useState(null);

// // //   useEffect(() => {
// // //     speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
// // //   }, []);

// // //   const speak = (text) => {
// // //     const u = new SpeechSynthesisUtterance(text);
// // //     const voices = speechSynthesis.getVoices();
// // //     const preferredVoice = voices.find(v => v.name === "Daniel" || v.name === "Samantha" || v.name === "Karen");
// // //     if (preferredVoice) u.voice = preferredVoice;
// // //     u.pitch = 1.1;
// // //     u.rate = 0.9;
// // //     speechSynthesis.speak(u);
// // //     setUtterance(u);
// // //   };

// // //   const stopSpeaking = () => {
// // //     speechSynthesis.cancel();
// // //     setUtterance(null);
// // //   };

// // //   const askAI = async (prompt) => {
// // //     setLoading(true);
// // //     try {
// // //       const response = await fetch("https://skillbridge-d7z9.onrender.com/api/ask/", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ question: prompt })
// // //       });
// // //       const data = await response.json();
// // //       const reply = data.answer || data.error || "No response";
// // //       setAnswer(reply);
// // //       speak(reply);
// // //     } catch (err) {
// // //       console.error("❌ Fetch error:", err);
// // //       setAnswer("Something went wrong while fetching from AI.");
// // //     }
// // //     setLoading(false);
// // //   };

// // //   const toggleListening = () => {
// // //     if (!('webkitSpeechRecognition' in window)) {
// // //       alert("Your browser doesn't support voice recognition.");
// // //       return;
// // //     }
// // //     const recognition = new window.webkitSpeechRecognition();
// // //     recognition.lang = 'en-US';
// // //     recognition.onresult = (event) => {
// // //       const transcript = event.results[0][0].transcript;
// // //       setQuestion(transcript);
// // //       askAI(transcript);
// // //     };
// // //     recognition.onerror = (e) => {
// // //       console.error("Speech recognition error:", e);
// // //       setListening(false);
// // //     };
// // //     recognition.onend = () => setListening(false);
// // //     setListening(true);
// // //     recognition.start();
// // //   };

// // //   const handleRoleplay = (selectedRole) => {
// // //     setRole(selectedRole);
// // //     const questions = {
// // //       customer: "How can I help you today?",
// // //       boss: "Tell me about your performance this week."
// // //     };
// // //     const prompt = questions[selectedRole] || "Let's start our roleplay.";
// // //     setAnswer(prompt);
// // //     speak(prompt);
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center text-center p-6 animate-fade-in">
// // //       <div className="w-full max-w-2xl">
// // //         <h2 className="text-3xl font-bold text-blue-800 mb-6">🎭 Roleplay with Gemini AI</h2>

// // //         {!mode && (
// // //           <div className="flex gap-4 mb-8">
// // //             <button onClick={() => setMode("ask")} className="px-6 py-3 bg-blue-600 text-white rounded text-xl">🔍 Ask</button>
// // //             <button onClick={() => setMode("roleplay")} className="px-6 py-3 bg-green-600 text-white rounded text-xl">🎭 Roleplay</button>
// // //           </div>
// // //         )}

// // //         {mode === "ask" && (
// // //           <div>
// // //             <textarea
// // //               rows={3}
// // //               className="w-full p-3 border rounded text-gray-800 mb-4"
// // //               placeholder="Type your question..."
// // //               value={question}
// // //               onChange={(e) => setQuestion(e.target.value)}
// // //             />
// // //             <div className="flex gap-4 mb-6">
// // //               <button onClick={() => askAI(question)} className="px-4 py-2 bg-blue-700 text-white rounded">💬 Ask AI</button>
// // //               <button onClick={toggleListening} className="px-4 py-2 bg-purple-700 text-white rounded">🎤 Voice</button>
// // //               <button onClick={stopSpeaking} className="px-4 py-2 bg-red-600 text-white rounded">🛑 Stop</button>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {mode === "roleplay" && !role && (
// // //           <div className="flex flex-col items-center gap-4">
// // //             <p className="text-lg">Choose a role to begin:</p>
// // //             <button onClick={() => handleRoleplay("customer")} className="px-4 py-2 bg-yellow-500 text-white rounded">🛒 Customer</button>
// // //             <button onClick={() => handleRoleplay("boss")} className="px-4 py-2 bg-indigo-500 text-white rounded">👔 Boss</button>
// // //           </div>
// // //         )}

// // //         {answer && (
// // //           <div className="bg-gray-100 p-4 mt-4 rounded shadow text-left">
// // //             <strong className="block mb-2">AI:</strong>
// // //             <p className="whitespace-pre-wrap leading-relaxed text-gray-800">{answer}</p>
// // //           </div>
// // //         )}

// // //         {role && (
// // //           <textarea
// // //             rows={3}
// // //             className="w-full p-3 border rounded text-gray-800 mt-4"
// // //             placeholder="Your response..."
// // //             value={question}
// // //             onChange={(e) => setQuestion(e.target.value)}
// // //           />
// // //         )}

// // //         {role && (
// // //           <div className="flex gap-4 mt-2">
// // //             <button onClick={() => askAI(question)} className="px-4 py-2 bg-green-600 text-white rounded">✅ Submit Response</button>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // import React, { useState, useEffect } from "react";

// // // // export default function Chat() {
// // // //   const [question, setQuestion] = useState("");
// // // //   const [answer, setAnswer] = useState("");
// // // //   const [listening, setListening] = useState(false);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [utterance, setUtterance] = useState(null);
// // // //   const [mode, setMode] = useState("chat");
// // // //   const [role, setRole] = useState("interviewer");
// // // //   const [history, setHistory] = useState([]);

// // // //   useEffect(() => {
// // // //     speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     if (role === "customer") {
// // // //       const firstPrompt = "Welcome! What brings you in today?";
// // // //       setAnswer(firstPrompt);
// // // //       speak(firstPrompt);
// // // //     }
// // // //   }, [role]);

// // // //   useEffect(() => {
// // // //     if (mode === "talk") {
// // // //       toggleListening();
// // // //     }
// // // //   }, [mode]);

// // // //   const speak = (text) => {
// // // //     const u = new SpeechSynthesisUtterance(text);
// // // //     const voices = speechSynthesis.getVoices();
// // // //     const preferredVoice = voices.find(v =>
// // // //       v.name === "Daniel" || v.name === "Samantha" || v.name === "Karen"
// // // //     );
// // // //     if (preferredVoice) u.voice = preferredVoice;
// // // //     u.pitch = 1.1;
// // // //     u.rate = 0.9;
// // // //     speechSynthesis.speak(u);
// // // //     setUtterance(u);
// // // //   };

// // // //   const stopSpeaking = () => {
// // // //     speechSynthesis.cancel();
// // // //     setUtterance(null);
// // // //   };

// // // //   const askAI = async (q) => {
// // // //     const prompt = q || question;
// // // //     setLoading(true);

// // // //     const fullContext = history.map(h => `You: ${h.q}\nAI: ${h.a}`).join("\n");
// // // //     const roleplayIntro = `You are roleplaying as a friendly ${role}. Speak clearly and ask questions like in real life.`;
// // // //     const combinedPrompt = `${roleplayIntro}\n${fullContext}\nYou: ${prompt}\nAI:`;

// // // //     try {
// // // //       const response = await fetch("https://skillbridge-d7z9.onrender.com/api/ask/", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({ question: combinedPrompt }),
// // // //       });
// // // //       const data = await response.json();
// // // //       const reply = data.answer || data.error || "No response";
// // // //       setAnswer(reply);
// // // //       setHistory([...history, { q: prompt, a: reply }]);
// // // //       speak(reply);
// // // //     } catch (err) {
// // // //       console.error("❌ Fetch error:", err);
// // // //       setAnswer("Something went wrong while fetching from AI.");
// // // //     }
// // // //     setLoading(false);
// // // //   };

// // // //   const toggleListening = () => {
// // // //     if (!('webkitSpeechRecognition' in window)) {
// // // //       alert("Your browser doesn't support voice recognition.");
// // // //       return;
// // // //     }

// // // //     const recognition = new window.webkitSpeechRecognition();
// // // //     recognition.continuous = false;
// // // //     recognition.interimResults = false;
// // // //     recognition.lang = 'en-US';

// // // //     recognition.onresult = (event) => {
// // // //       const transcript = event.results[0][0].transcript;
// // // //       setQuestion(transcript);
// // // //       askAI(transcript);
// // // //     };

// // // //     recognition.onerror = (e) => {
// // // //       console.error("Speech recognition error:", e);
// // // //       setListening(false);
// // // //     };

// // // //     recognition.onend = () => {
// // // //       setListening(false);
// // // //     };

// // // //     setListening(true);
// // // //     recognition.start();
// // // //     console.log("🎤 Listening started...");
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center text-center p-6 animate-fade-in">
// // // //       <div className="w-full max-w-2xl">
// // // //         <h2 className="text-3xl font-bold text-blue-800 mb-6">🎭 Roleplay with Gemini AI</h2>

// // // //         <div className="mb-4 flex flex-col md:flex-row justify-center gap-4">
// // // //           <label className="text-lg">Mode:</label>
// // // //           <button onClick={() => setMode("chat")} disabled={mode === "chat"} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
// // // //             💬 Chat
// // // //           </button>
// // // //           <button onClick={() => setMode("talk")} disabled={mode === "talk"} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
// // // //             🎤 Talk
// // // //           </button>
// // // //         </div>

// // // //         <div className="mb-4">
// // // //           <label className="text-lg mr-2">Roleplay As:</label>
// // // //           <select value={role} onChange={e => setRole(e.target.value)} className="p-2 border rounded">
// // // //             <option value="interviewer">Job Interviewer</option>
// // // //             <option value="customer">Customer</option>
// // // //             <option value="teacher">Teacher</option>
// // // //             <option value="friend">Friend</option>
// // // //           </select>
// // // //         </div>

// // // //         <textarea
// // // //           rows={3}
// // // //           className="w-full p-3 border rounded text-gray-800 mb-4"
// // // //           placeholder="Type your response..."
// // // //           value={question}
// // // //           onChange={(e) => setQuestion(e.target.value)}
// // // //         />

// // // //         <div className="mb-6">
// // // //           {mode === "chat" ? (
// // // //             <button
// // // //               onClick={() => askAI()}
// // // //               disabled={loading}
// // // //               className="px-4 py-2 bg-blue-700 text-white rounded mr-2 hover:bg-blue-800 disabled:opacity-50"
// // // //             >
// // // //               {loading ? "🤔 Thinking..." : "💬 Ask AI"}
// // // //             </button>
// // // //           ) : (
// // // //             <button
// // // //               onClick={toggleListening}
// // // //               disabled={loading || listening}
// // // //               className="px-4 py-2 bg-blue-700 text-white rounded mr-2 hover:bg-blue-800 disabled:opacity-50"
// // // //             >
// // // //               {listening ? "🎙️ Listening..." : "🎤 Talk to AI"}
// // // //             </button>
// // // //           )}

// // // //           <button
// // // //             onClick={stopSpeaking}
// // // //             className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
// // // //           >
// // // //             🛑 Stop Voice
// // // //           </button>
// // // //         </div>

// // // //         {answer && (
// // // //           <div className="bg-gray-100 p-4 rounded shadow text-left">
// // // //             <strong className="block mb-2">AI:</strong>
// // // //             <p className="whitespace-pre-wrap leading-relaxed text-gray-800">{answer}</p>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // // Chat.js
// // // // // import React, { useState, useEffect } from "react";

// // // // // export default function Chat() {
// // // // //   const [question, setQuestion] = useState("");
// // // // //   const [answer, setAnswer] = useState("");
// // // // //   const [listening, setListening] = useState(false);
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [utterance, setUtterance] = useState(null);
// // // // //   const [mode, setMode] = useState("chat");
// // // // //   console.log("Current mode:", mode);
// // // // //   const [role, setRole] = useState("interviewer");
// // // // //   const [history, setHistory] = useState([]);

// // // // //   useEffect(() => {
// // // // //     speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
// // // // //   }, []);

// // // // //   const speak = (text) => {
// // // // //     const u = new SpeechSynthesisUtterance(text);
// // // // //     const voices = speechSynthesis.getVoices();
// // // // //     const preferredVoice = voices.find(v =>
// // // // //       v.name === "Daniel" || v.name === "Samantha" || v.name === "Karen"
// // // // //     );
// // // // //     if (preferredVoice) u.voice = preferredVoice;
// // // // //     u.pitch = 1.1;
// // // // //     u.rate = 0.9;
// // // // //     speechSynthesis.speak(u);
// // // // //     setUtterance(u);
// // // // //   };

// // // // //   const stopSpeaking = () => {
// // // // //     speechSynthesis.cancel();
// // // // //     setUtterance(null);
// // // // //   };

// // // // //   const askAI = async (q) => {
// // // // //     const prompt = q || question;
// // // // //     setLoading(true);

// // // // //     const fullContext = history.map(h => `You: ${h.q}\nAI: ${h.a}`).join("\n");
// // // // //     const roleplayIntro = `You are roleplaying as a friendly ${role}. Speak clearly and ask questions like in real life.`;
// // // // //     const combinedPrompt = `${roleplayIntro}\n${fullContext}\nYou: ${prompt}\nAI:`;

// // // // //     try {
// // // // //       const response = await fetch("https://skillbridge-d7z9.onrender.com/api/ask/", {
// // // // //         method: "POST",
// // // // //         headers: { "Content-Type": "application/json" },
// // // // //         body: JSON.stringify({ question: combinedPrompt }),
// // // // //       });
// // // // //       const data = await response.json();
// // // // //       const reply = data.answer || data.error || "No response";
// // // // //       setAnswer(reply);
// // // // //       setHistory([...history, { q: prompt, a: reply }]);
// // // // //       speak(reply);
// // // // //     } catch (err) {
// // // // //       console.error("❌ Fetch error:", err);
// // // // //       setAnswer("Something went wrong while fetching from AI.");
// // // // //     }
// // // // //     setLoading(false);
// // // // //   };

// // // // // //   const toggleListening = () => {
// // // // // //     if (!('webkitSpeechRecognition' in window)) {
// // // // // //       alert("Your browser doesn't support voice recognition.");
// // // // // //       return;
// // // // // //     }
// // // // // //     const recognition = new window.webkitSpeechRecognition();
// // // // // //     recognition.lang = 'en-US';
// // // // // //     recognition.onresult = (event) => {
// // // // // //       const transcript = event.results[0][0].transcript;
// // // // // //       setQuestion(transcript);
// // // // // //       askAI(transcript);
// // // // // //     };
// // // // // //     recognition.onend = () => setListening(false);
// // // // // //     recognition.start();
// // // // // //     setListening(true);
// // // // // //   };
// // // // // const toggleListening = () => {
// // // // //     if (!('webkitSpeechRecognition' in window)) {
// // // // //       alert("Your browser doesn't support voice recognition.");
// // // // //       return;
// // // // //     }
  
// // // // //     const recognition = new window.webkitSpeechRecognition();
// // // // //     recognition.continuous = false;
// // // // //     recognition.interimResults = false;
// // // // //     recognition.lang = 'en-US';
  
// // // // //     recognition.onresult = (event) => {
// // // // //       const transcript = event.results[0][0].transcript;
// // // // //       setQuestion(transcript);
// // // // //       askAI(transcript);
// // // // //     };
  
// // // // //     recognition.onerror = (e) => {
// // // // //       console.error("Speech recognition error:", e);
// // // // //       setListening(false);
// // // // //     };
  
// // // // //     recognition.onend = () => {
// // // // //       setListening(false);
// // // // //     };
  
// // // // //     setListening(true);
// // // // //     recognition.start();
// // // // //     console.log("🛑 Stopped listening");
// // // // //   };
  
// // // // //   return (
// // // // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center text-center p-6 animate-fade-in">
// // // // //       <div className="w-full max-w-2xl">
// // // // //         <h2 className="text-3xl font-bold text-blue-800 mb-6">🎭 Roleplay with Gemini AI</h2>

// // // // //         <div className="mb-4 flex flex-col md:flex-row justify-center gap-4">
// // // // //           <label className="text-lg">Mode:</label>
// // // // //           <button onClick={() => setMode("chat")} disabled={mode === "chat"} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
// // // // //             💬 Chat
// // // // //           </button>
// // // // //           <button onClick={() => setMode("talk")} disabled={mode === "talk"} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
// // // // //             🎤 Talk
// // // // //           </button>
// // // // //         </div>

// // // // //         <div className="mb-4">
// // // // //           <label className="text-lg mr-2">Roleplay As:</label>
// // // // //           <select value={role} onChange={e => setRole(e.target.value)} className="p-2 border rounded">
// // // // //             <option value="interviewer">Job Interviewer</option>
// // // // //             <option value="customer">Customer</option>
// // // // //             <option value="teacher">Teacher</option>
// // // // //             <option value="friend">Friend</option>
// // // // //           </select>
// // // // //         </div>

// // // // //         <textarea
// // // // //           rows={3}
// // // // //           className="w-full p-3 border rounded text-gray-800 mb-4"
// // // // //           placeholder="Type your response..."
// // // // //           value={question}
// // // // //           onChange={(e) => setQuestion(e.target.value)}
// // // // //         />

// // // // //         <div className="mb-6">
// // // // //           {mode === "chat" ? (
// // // // //             <button
// // // // //               onClick={() => askAI()}
// // // // //               disabled={loading}
// // // // //               className="px-4 py-2 bg-blue-700 text-white rounded mr-2 hover:bg-blue-800 disabled:opacity-50"
// // // // //             >
// // // // //               {loading ? "🤔 Thinking..." : "💬 Ask AI"}
// // // // //             </button>
// // // // //           ) : (
// // // // //             <button
// // // // //               onClick={toggleListening}
// // // // //               disabled={loading || listening}
// // // // //               className="px-4 py-2 bg-blue-700 text-white rounded mr-2 hover:bg-blue-800 disabled:opacity-50"
// // // // //             >
// // // // //               {listening ? "🎙️ Listening..." : "🎤 Talk to AI"}
// // // // //             </button>
// // // // //           )}

// // // // //           <button
// // // // //             onClick={stopSpeaking}
// // // // //             className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
// // // // //           >
// // // // //             🛑 Stop Voice
// // // // //           </button>
// // // // //         </div>

// // // // //         {answer && (
// // // // //           <div className="bg-gray-100 p-4 rounded shadow text-left">
// // // // //             <strong className="block mb-2">AI:</strong>
// // // // //             <p className="whitespace-pre-wrap leading-relaxed text-gray-800">{answer}</p>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // //  // // Chat.js
// // // // // // import React, { useState, useEffect } from "react";

// // // // // // export default function Chat() {
// // // // // //   const [question, setQuestion] = useState("");
// // // // // //   const [answer, setAnswer] = useState("");
// // // // // //   const [listening, setListening] = useState(false);
// // // // // //   const [loading, setLoading] = useState(false);
// // // // // //   const [utterance, setUtterance] = useState(null);
// // // // // //   const [mode, setMode] = useState("chat"); // chat or talk
// // // // // //   const [role, setRole] = useState("interviewer");
// // // // // //   const [history, setHistory] = useState([]);

// // // // // //   useEffect(() => {
// // // // // //     speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
// // // // // //   }, []);

// // // // // //   const speak = (text) => {
// // // // // //     const u = new SpeechSynthesisUtterance(text);
// // // // // //     const voices = speechSynthesis.getVoices();
// // // // // //     const preferredVoice = voices.find(v =>
// // // // // //       v.name === "Daniel" || v.name === "Samantha" || v.name === "Karen"
// // // // // //     );
// // // // // //     if (preferredVoice) u.voice = preferredVoice;
// // // // // //     u.pitch = 1.1;
// // // // // //     u.rate = 0.9;
// // // // // //     speechSynthesis.speak(u);
// // // // // //     setUtterance(u);
// // // // // //   };

// // // // // //   const stopSpeaking = () => {
// // // // // //     speechSynthesis.cancel();
// // // // // //     setUtterance(null);
// // // // // //   };

// // // // // //   const askAI = async (q) => {
// // // // // //     const prompt = q || question;
// // // // // //     setLoading(true);

// // // // // //     const fullContext = history.map(h => `You: ${h.q}\nAI: ${h.a}`).join("\n");
// // // // // //     const roleplayIntro = `You are roleplaying as a friendly ${role}. Speak clearly and ask questions like in real life.`;
// // // // // //     const combinedPrompt = `${roleplayIntro}\n${fullContext}\nYou: ${prompt}\nAI:`;

// // // // // //     try {
// // // // // //       const response = await fetch("https://skillbridge-d7z9.onrender.com/api/ask/", {
// // // // // //         method: "POST",
// // // // // //         headers: { "Content-Type": "application/json" },
// // // // // //         body: JSON.stringify({ question: combinedPrompt }),
// // // // // //       });
// // // // // //       const data = await response.json();
// // // // // //       const reply = data.answer || data.error || "No response";
// // // // // //       setAnswer(reply);
// // // // // //       setHistory([...history, { q: prompt, a: reply }]);
// // // // // //       speak(reply);
// // // // // //     } catch (err) {
// // // // // //       console.error("❌ Fetch error:", err);
// // // // // //       setAnswer("Something went wrong while fetching from AI.");
// // // // // //     }
// // // // // //     setLoading(false);
// // // // // //   };

// // // // // //   const toggleListening = () => {
// // // // // //     if (!('webkitSpeechRecognition' in window)) {
// // // // // //       alert("Your browser doesn't support voice recognition.");
// // // // // //       return;
// // // // // //     }
// // // // // //     const recognition = new window.webkitSpeechRecognition();
// // // // // //     recognition.lang = 'en-US';
// // // // // //     recognition.onresult = (event) => {
// // // // // //       const transcript = event.results[0][0].transcript;
// // // // // //       setQuestion(transcript);
// // // // // //       askAI(transcript);
// // // // // //     };
// // // // // //     recognition.onend = () => setListening(false);
// // // // // //     recognition.start();
// // // // // //     setListening(true);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div style={{ padding: "2rem" }}>
// // // // // //       <h2>🎭 Roleplay with Gemini AI</h2>

// // // // // //       <div style={{ marginBottom: "1rem" }}>
// // // // // //         <label>Mode: </label>
// // // // // //         <button onClick={() => setMode("chat")} disabled={mode === "chat"}>💬 Chat</button>
// // // // // //         <button onClick={() => setMode("talk")} disabled={mode === "talk"}>🎤 Talk</button>
// // // // // //       </div>

// // // // // //       <div style={{ marginBottom: "1rem" }}>
// // // // // //         <label>Roleplay As: </label>
// // // // // //         <select value={role} onChange={e => setRole(e.target.value)}>
// // // // // //           <option value="interviewer">Job Interviewer</option>
// // // // // //           <option value="customer">Customer</option>
// // // // // //           <option value="teacher">Teacher</option>
// // // // // //           <option value="friend">Friend</option>
// // // // // //         </select>
// // // // // //       </div>

// // // // // //       <textarea
// // // // // //         rows={3}
// // // // // //         style={{ width: "100%", fontSize: "1rem", padding: "0.5rem" }}
// // // // // //         placeholder="Type your response..."
// // // // // //         value={question}
// // // // // //         onChange={(e) => setQuestion(e.target.value)}
// // // // // //       />

// // // // // //       <div style={{ marginTop: "1rem" }}>
// // // // // //         {mode === "chat" ? (
// // // // // //           <button
// // // // // //             onClick={() => askAI()}
// // // // // //             disabled={loading}
// // // // // //             style={{ marginRight: "1rem" }}
// // // // // //           >
// // // // // //             {loading ? "🤔 Thinking..." : "💬 Ask AI"}
// // // // // //           </button>
// // // // // //         ) : (
// // // // // //           <button
// // // // // //             onClick={toggleListening}
// // // // // //             disabled={loading || listening}
// // // // // //             style={{ marginRight: "1rem" }}
// // // // // //           >
// // // // // //             {listening ? "🎙️ Listening..." : "🎤 Talk to AI"}
// // // // // //           </button>
// // // // // //         )}

// // // // // //         <button onClick={stopSpeaking}>🛑 Stop Voice</button>
// // // // // //       </div>

// // // // // //       {answer && (
// // // // // //         <div style={{ marginTop: "1.5rem", background: "#f8f9fa", padding: "1.2rem", borderRadius: "10px", lineHeight: "1.6", fontSize: "1.1rem", whiteSpace: "pre-wrap" }}>
// // // // // //           <strong style={{ display: "block", marginBottom: "0.5rem" }}>AI:</strong>
// // // // // //           {answer}
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // } 