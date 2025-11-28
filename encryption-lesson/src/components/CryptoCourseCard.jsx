import React from 'react';

const CryptoCourseCard = () => {
  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Icon / Illustration Placeholder */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center text-4xl shadow-inner">
            🔐
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Cryptographic Algorithmic Thinking
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Master the core ideas behind RSA and AES — how computers lock, scramble, and unlock information — through interactive, visual exercises.
          </p>

          {/* Stats Line */}
          <div className="flex items-center justify-center md:justify-start gap-4 text-sm font-medium text-gray-500">
            <span>12 Lessons</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>80 Exercises</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoCourseCard;
