import React, { useState } from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

const GRID_SIZE = 4; // 4x4 for real AES, simplified visualization

// Initial state helpers
const stringToGrid = (str) => {
  const grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0));
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const row = i % GRID_SIZE; // Col-major order in AES usually, but row-major is easier to read for beginners
    const col = Math.floor(i / GRID_SIZE);
    // Let's stick to standard reading order (row-major) for simplicity in teaching
    const r = Math.floor(i / GRID_SIZE);
    const c = i % GRID_SIZE;
    if (i < str.length) {
      grid[r][c] = str.charCodeAt(i);
    }
  }
  return grid;
};

// Toy S-Box (simplified)
const sBox = (val) => (val * 3 + 7) % 256;

// AES Lesson Component
const AESLesson = () => {
  const [inputWord, setInputWord] = useState('CYBERSECURITY101'); // Default 16 chars
  const [keyWord, setKeyWord] = useState('SECRETKEY_2024!!');
  const [grid, setGrid] = useState(stringToGrid('CYBERSECURITY101'));
  const [activeStep, setActiveStep] = useState(0);
  const [description, setDescription] = useState("Start by entering a 16-character message.");

  const resetGrid = () => {
      setGrid(stringToGrid(inputWord.padEnd(16, ' ').slice(0, 16)));
      setActiveStep(0);
      setDescription("Start by entering a 16-character message.");
  };

  const handleSubBytes = () => {
    const newGrid = grid.map(row => row.map(cell => sBox(cell)));
    setGrid(newGrid);
    setActiveStep(1);
    setDescription("SubBytes: Each byte is replaced by another according to a lookup table (S-Box). This creates confusion.");
  };

  const handleShiftRows = () => {
    // Row 0: no shift
    // Row 1: shift left 1
    // Row 2: shift left 2
    // Row 3: shift left 3
    const newGrid = grid.map((row, r) => {
        const shift = r;
        return [...row.slice(shift), ...row.slice(0, shift)];
    });
    setGrid(newGrid);
    setActiveStep(2);
    setDescription("ShiftRows: Rows are shifted cyclically. This spreads data to different columns.");
  };

  const handleMixColumns = () => {
    // Toy mixing: NewCol[i] = (Col[i] + Col[i+1]) % 255 (very simplified)
    // We'll just do a visual shuffle or simple math to show values changing based on neighbors
    const newGrid = Array(4).fill(null).map(() => Array(4).fill(0));

    for (let c = 0; c < 4; c++) {
        for (let r = 0; r < 4; r++) {
            // Mix with neighbor in column
            const neighbor = grid[(r + 1) % 4][c];
            newGrid[r][c] = (grid[r][c] * 2 + neighbor) % 256;
        }
    }
    setGrid(newGrid);
    setActiveStep(3);
    setDescription("MixColumns: Columns are mixed mathematically. In real AES, this uses finite field arithmetic.");
  };

  const handleAddRoundKey = () => {
      const keyGrid = stringToGrid(keyWord.padEnd(16, ' ').slice(0, 16));
      const newGrid = grid.map((row, r) =>
        row.map((cell, c) => cell ^ keyGrid[r][c])
      );
      setGrid(newGrid);
      setActiveStep(4);
      setDescription("AddRoundKey: The state is XORed with the round key. This injects the secret.");
  };

  // Render a single grid cell
  const Cell = ({ val }) => (
      <div className="w-12 h-12 sm:w-16 sm:h-16 flex flex-col items-center justify-center border border-gray-200 rounded-lg bg-white shadow-sm font-mono text-sm sm:text-base">
          <span className="text-gray-900 font-bold">
            {val.toString(16).toUpperCase().padStart(2, '0')}
          </span>
          <span className="text-xxs text-gray-400 hidden sm:block">
            {val >= 32 && val <= 126 ? String.fromCharCode(val) : '.'}
          </span>
      </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      <NavBar />

      <div className="max-w-5xl mx-auto px-4 pt-10">
        <div className="mb-8">
            <Link to="/crypto" className="text-sm font-bold text-gray-500 hover:text-indigo-600 mb-2 inline-block">← Back to Course</Link>
            <h1 className="text-4xl font-extrabold text-gray-900">AES: Scrambling with Rounds</h1>
            <p className="text-gray-600 mt-2 text-lg">Visualize how data is transformed in a single AES round.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
            {/* Control Panel */}
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4">Input Configuration</h3>

                    <div className="mb-4">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Message (16 chars)</label>
                        <input
                            type="text"
                            maxLength={16}
                            value={inputWord}
                            onChange={(e) => {
                                setInputWord(e.target.value);
                                if (activeStep === 0) setGrid(stringToGrid(e.target.value.padEnd(16, ' ').slice(0, 16)));
                            }}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-mono focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Key (16 chars)</label>
                        <input
                            type="text"
                            maxLength={16}
                            value={keyWord}
                            onChange={(e) => setKeyWord(e.target.value)}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-mono focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <button
                        onClick={resetGrid}
                        className="text-sm text-indigo-600 font-bold hover:text-indigo-800"
                    >
                        Reset / Start Over
                    </button>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4">Round Operations</h3>
                    <div className="space-y-3">
                        <button
                            onClick={handleSubBytes}
                            disabled={activeStep !== 0}
                            className={`w-full py-3 px-4 rounded-xl flex justify-between items-center font-bold transition-all ${activeStep === 0 ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 ring-2 ring-indigo-200' : 'bg-gray-50 text-gray-400 cursor-not-allowed'}`}
                        >
                            <span>1. SubBytes</span>
                            <span>→</span>
                        </button>

                        <button
                            onClick={handleShiftRows}
                            disabled={activeStep !== 1}
                             className={`w-full py-3 px-4 rounded-xl flex justify-between items-center font-bold transition-all ${activeStep === 1 ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 ring-2 ring-indigo-200' : 'bg-gray-50 text-gray-400 cursor-not-allowed'}`}
                        >
                            <span>2. ShiftRows</span>
                            <span>→</span>
                        </button>

                         <button
                            onClick={handleMixColumns}
                            disabled={activeStep !== 2}
                             className={`w-full py-3 px-4 rounded-xl flex justify-between items-center font-bold transition-all ${activeStep === 2 ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 ring-2 ring-indigo-200' : 'bg-gray-50 text-gray-400 cursor-not-allowed'}`}
                        >
                            <span>3. MixColumns</span>
                            <span>→</span>
                        </button>

                         <button
                            onClick={handleAddRoundKey}
                            disabled={activeStep !== 3}
                             className={`w-full py-3 px-4 rounded-xl flex justify-between items-center font-bold transition-all ${activeStep === 3 ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 ring-2 ring-indigo-200' : 'bg-gray-50 text-gray-400 cursor-not-allowed'}`}
                        >
                            <span>4. AddRoundKey</span>
                            <span>→</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Visualization Grid */}
            <div className="flex flex-col">
                 <div className="bg-gray-900 p-8 rounded-3xl shadow-2xl flex-1 flex flex-col items-center justify-center relative overflow-hidden">
                     {/* Explanation Toast */}
                     <div className="absolute top-6 left-6 right-6 bg-gray-800/90 backdrop-blur text-white p-4 rounded-xl text-sm border border-gray-700 shadow-lg">
                         <span className="font-bold text-indigo-400 block mb-1">
                            {activeStep === 0 ? "Initial State" :
                             activeStep === 1 ? "After SubBytes" :
                             activeStep === 2 ? "After ShiftRows" :
                             activeStep === 3 ? "After MixColumns" : "After AddRoundKey"}
                         </span>
                         {description}
                     </div>

                     <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-16">
                         {grid.map((row, r) =>
                            row.map((val, c) => (
                                <Cell key={`${r}-${c}`} val={val} />
                            ))
                         )}
                     </div>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AESLesson;
