"use client";
import React from "react";

interface ComingSoonProps {
  title: string;
  icon: React.ReactNode;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ title, icon }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="relative bg-gray-900 shadow-lg rounded-lg p-8 lg:w-[500px] aspect-square mx-auto flex flex-col justify-center text-center overflow-hidden">
        {/* Shining overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -left-full top-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine" />
        </div>
        {/* Content (ensure it appears above the shine overlay) */}
        <div className="relative z-10 flex justify-center mb-4">{icon}</div>
        <h1 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          {title}
        </h1>
        <p className="relative z-10 mt-2 text-xl md:text-2xl lg:text-3xl text-gray-100">
          Will be available soon
        </p>
      </div>
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        .animate-shine {
          animation: shine 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ComingSoon;
