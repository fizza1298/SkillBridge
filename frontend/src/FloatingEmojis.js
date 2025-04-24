import React, { useEffect, useState } from "react";

const EMOJIS = ["✨", "💫", "🌟", "🎉", "🪄", "💥"];

export default function FloatingEmojis() {
  const [emojis, setEmojis] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newEmoji = {
        id: Date.now(),
        symbol: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        left: Math.random() * 100 + "%",
      };
      setEmojis((prev) => [...prev, newEmoji]);

      // Cleanup old ones after animation
      setTimeout(() => {
        setEmojis((prev) => prev.filter((e) => e.id !== newEmoji.id));
      }, 3000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {emojis.map((emoji) => (
        <div
          key={emoji.id}
          className="emoji-float"
          style={{ left: emoji.left }}
        >
          {emoji.symbol}
        </div>
      ))}
    </>
  );
}
