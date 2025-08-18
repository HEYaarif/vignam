"use client";

import { useState } from "react";

export default function HeroVideo() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative w-full h-screen bg-black flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        {isPlaying ? (
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/E1czmX6bjFA?autoplay=1&mute=0"
            title="Forge Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div
            className="relative w-full h-full flex items-center justify-center cursor-pointer"
            onClick={() => setIsPlaying(true)}
          >
            
            <div className="absolute bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
              <div className="w-0 h-0 border-l-[20px] border-l-blue-600 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
            </div>
          </div>
        )}
      </div>

      {/* Top Left Controls */}
      <div className="absolute top-4 left-4">
        <button className="bg-white text-black text-xs px-3 py-1 rounded shadow">
          🔊 SOUND ON
        </button>
      </div>

      {/* Top Right Link */}
      <div className="absolute top-4 right-4">
        <a
          href="https://www.youtube.com/watch?v=E1czmX6bjFA&t=10s"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black text-xs px-3 py-1 rounded shadow flex items-center gap-1"
        >
          CHECK ON YOUTUBE ↗
        </a>
      </div>
    </section>
  );
}
