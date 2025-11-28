import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-white border-b border-gray-100 py-4">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <Link to="/crypto" className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          <span className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center text-sm font-serif">C</span>
          Crypto Lab
        </Link>
        <div className="text-sm font-medium text-gray-500">
          Interactive Lessons
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
