import React from "react";
import { useNavigate } from "react-router-dom";


export default function Email() {
   const navigate = useNavigate();
    return (
     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 flex flex-col items-center animate-fade-in">
       <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4 text-center">
         📧 How to Write a Professional Email
       </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl text-center mb-6">
         Writing a professional email can help you apply for jobs, communicate with employers,
         and make a good impression. Let’s go through it step by step.
       </p>
        {/* Section 1: Subject Line */}
       <section className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-4xl">
         <h2 className="text-2xl font-semibold text-blue-700 mb-2">1. Use a Clear Subject Line</h2>
         <p className="text-gray-700 mb-2">
           A subject line tells the reader what your email is about. Keep it short and specific.
         </p>
         <div className="bg-gray-100 p-3 rounded">
           <strong>Example:</strong><br />
           <code>Job Application: Customer Service Assistant</code>
         </div>
       </section>
        {/* Section 2: Greeting */}
       <section className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-4xl">
         <h2 className="text-2xl font-semibold text-blue-700 mb-2">2. Start with a Greeting</h2>
         <p className="text-gray-700 mb-2">Begin your email politely with one of these greetings:</p>
         <ul className="list-disc list-inside text-gray-800">
           <li>Dear [Hiring Manager],</li>
           <li>Hello [Name],</li>
         </ul>
       </section>
        {/* Section 3: Email Body */}
       <section className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-4xl">
         <h2 className="text-2xl font-semibold text-blue-700 mb-2">3. Write the Body</h2>
         <p className="text-gray-700 mb-2">Explain who you are and why you're writing.</p>
         <div className="bg-gray-100 p-3 rounded">
           <strong>Example:</strong>
           <p className="mt-2">
             I am writing to apply for the Customer Service Assistant position at ABC Company.
             I have experience working with people and enjoy helping customers. Please find my resume attached.
           </p>
         </div>
       </section>
        {/* Section 4: Closing */}
       <section className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-4xl">
         <h2 className="text-2xl font-semibold text-blue-700 mb-2">4. End with a Closing</h2>
         <p className="text-gray-700 mb-2">Finish your email with a polite closing:</p>
         <ul className="list-disc list-inside text-gray-800 mb-2">
           <li>Sincerely,</li>
           <li>Best regards,</li>
         </ul>
         <p>Then type your name underneath.</p>
       </section>
        {/* Section 5: Final Example */}
       <section className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-4xl">
         <h2 className="text-2xl font-semibold text-blue-700 mb-2">5. Final Email Example</h2>
         <div className="bg-blue-50 p-4 rounded border border-blue-200">
           <p><strong>Subject:</strong> Job Application: Customer Service Assistant</p>
           <p className="mt-2">Dear Hiring Manager,</p>
           <p className="mt-2">
             I am writing to apply for the Customer Service Assistant position at ABC Company.
             I have 2 years of experience working in customer service and enjoy helping people solve problems.
             Please find my resume attached.
           </p>
           <p className="mt-2">Sincerely,<br />Alex Johnson</p>
         </div>
       </section>
        {/* Navigation Buttons */}
       <div className="flex flex-col md:flex-row gap-4 mt-6">
         <button
           onClick={() => navigate("/lessons")}
           className="px-6 py-3 bg-gray-500 text-white font-medium rounded-xl shadow hover:bg-gray-600 transition duration-200"
         >
           🔙 Back to Lessons
         </button>
          <button
           onClick={() => navigate("/lessons/email-quiz")}
           className="px-6 py-3 bg-green-600 text-white font-medium rounded-xl shadow hover:bg-green-700 transition duration-200"
         >
           🎓 Try Questions
         </button>
       </div>
     </div>
   );
 }
