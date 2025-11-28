import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import CryptoCourseCard from './CryptoCourseCard';

const CryptoLandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      <NavBar />

      {/* Progress Bar */}
      <div className="h-1 w-full bg-gray-200">
        <div className="h-1 bg-indigo-500 w-1/12"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-10">

        {/* Course Card */}
        <CryptoCourseCard />

        {/* Hero Section */}
        <div className="mt-12 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center">
          <div className="inline-block bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full mb-6 tracking-wide">
            LEVEL 1 &nbsp; • &nbsp; RSA & AES FUNDAMENTALS
          </div>

          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            The Crypto Algorithms Problem
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Let’s dive into two of the most important algorithms in modern security — RSA and AES. We’ll build them step by step, using small numbers and visual grids so every calculation is visible.
          </p>

          <div className="flex justify-center mb-8">
             {/* Illustration Placeholder */}
            <div className="w-64 h-32 bg-gray-100 rounded-xl flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 opacity-10 flex flex-wrap gap-1 p-2">
                 {[...Array(20)].map((_, i) => (
                   <div key={i} className="w-8 h-8 bg-indigo-500 rounded-sm"></div>
                 ))}
               </div>
               <div className="z-10 bg-white p-3 rounded-lg shadow-sm font-mono text-xs">
                 0x1A 0xB4 ...
               </div>
            </div>
          </div>
        </div>

        {/* Lesson Tiles */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* RSA Lesson */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-start hover:shadow-md transition-shadow">
             <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-xl mb-4">
               🗝️
             </div>
             <h3 className="text-xl font-bold mb-2">Lesson 1 · RSA — Locking with Math</h3>
             <p className="text-gray-600 text-sm mb-6 flex-1">
               Choose primes, build keys, and watch how a tiny message is encrypted and decrypted with modular arithmetic.
             </p>
             <button
               onClick={() => navigate('/crypto/rsa')}
               className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors"
             >
               Start RSA Lesson
             </button>
          </div>

          {/* AES Lesson */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-start hover:shadow-md transition-shadow">
             <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl mb-4">
               🧱
             </div>
             <h3 className="text-xl font-bold mb-2">Lesson 2 · AES — Scrambling with Rounds</h3>
             <p className="text-gray-600 text-sm mb-6 flex-1">
               Fill a 4×4 grid, apply SubBytes, ShiftRows, MixColumns, and see how each round mixes your data.
             </p>
             <button
               onClick={() => navigate('/crypto/aes')}
               className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors"
             >
               Start AES Lesson
             </button>
          </div>
        </div>

        {/* Practice Button */}
        <div className="mt-12 text-center">
          <button
            className="px-12 py-4 bg-indigo-600 text-white text-lg font-bold rounded-full shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
            onClick={() => alert('Practice exercises coming soon!')}
          >
            Practice Crypto Problems
          </button>
        </div>

      </div>
    </div>
  );
};

export default CryptoLandingPage;
