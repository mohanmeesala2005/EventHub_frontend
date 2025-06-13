import React, { useEffect, useState } from "react";

function Home() {
  // Typing animation for the tagline
  const phrases = [
    "Connect",
    "Create",
    "Celebrate with your community!"
  ];
  const [displayed, setDisplayed] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (phraseIdx < phrases.length) {
      if (charIdx < phrases[phraseIdx].length) {
        const timeout = setTimeout(() => {
          setDisplayed(prev => prev + phrases[phraseIdx][charIdx]);
          setCharIdx(charIdx + 1);
        }, 80);
        return () => clearTimeout(timeout);
      } else {
        // Pause before next phrase
        const timeout = setTimeout(() => {
          setDisplayed("");
          setCharIdx(0);
          setPhraseIdx(phraseIdx + 1);
        }, 900);
        return () => clearTimeout(timeout);
      }
    }
  }, [charIdx, phraseIdx, phrases]);

  // Reset to loop the animation
  useEffect(() => {
    if (phraseIdx === phrases.length) {
      const timeout = setTimeout(() => {
        setPhraseIdx(0);
        setDisplayed("");
        setCharIdx(0);
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [phraseIdx, phrases.length]);

  return (
    <div className="bg-gradient-to-br from-purple-600 via-blue-500 to-pink-400 min-h-screen flex items-center justify-center transition-all duration-700">
      <div className="p-10 rounded-xl shadow-2xl bg-white/20 backdrop-blur-md flex flex-col items-center animate-fade-in">
        <h1 className="text-5xl font-extrabold mb-4 text-white drop-shadow-lg">
          Welcome to <span className="text-yellow-300">EventHub!</span>
        </h1>
        <p className="text-lg text-white/90 mb-6 text-center animate-fade-in-slow">
          Discover and register for <span className="text-pink-200 font-semibold">exciting events</span>.<br />
          <span className="text-blue-100 font-semibold">
            {displayed}
            <span className="border-r-2 border-blue-200 ml-1 animate-blink"></span>
          </span>
        </p>
        <a
          href="/events"
          className="mt-2 px-8 py-3 bg-yellow-400 text-purple-900 font-bold rounded-full shadow-lg hover:bg-yellow-300 transition-all duration-300 animate-pulse"
        >
          Explore Events
        </a>
      </div>
      {/* Animations */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(40px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }
          .animate-fade-in-slow {
            animation: fade-in 2s ease-out;
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .animate-blink {
            animation: blink 1s steps(1) infinite;
          }
        `}
      </style>
    </div>
  );
}

export default Home; 