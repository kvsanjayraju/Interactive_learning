import React, { useState, useEffect } from 'react';
import { gcd, modInverse, modPow } from '../utils/cryptoMath';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

const PRIMES = [5, 7, 11, 13, 17, 19, 23];

const StepCard = ({ number, title, active, children }) => (
  <div className={`mb-6 border-l-4 pl-6 py-2 transition-colors duration-300 ${active ? 'border-indigo-500' : 'border-gray-200'}`}>
    <h3 className={`text-xl font-bold mb-2 ${active ? 'text-gray-900' : 'text-gray-400'}`}>
      <span className="mr-2 text-sm uppercase tracking-wider text-gray-500">Step {number}</span>
      {title}
    </h3>
    <div className={`${active ? 'block' : 'hidden'} mt-4`}>
       {children}
    </div>
  </div>
);

const RSALesson = () => {
  // State
  const [p, setP] = useState(PRIMES[0]);
  const [q, setQ] = useState(PRIMES[1]);
  const [e, setE] = useState(null);
  const [d, setD] = useState(null);
  const [message, setMessage] = useState('A');
  const [encryptedVal, setEncryptedVal] = useState(null);
  const [decryptedVal, setDecryptedVal] = useState(null);

  // Computed values
  const n = p * q;
  const phi = (p - 1) * (q - 1);

  // Possible e values: 1 < e < phi, gcd(e, phi) == 1
  const possibleEs = [];
  for (let cand = 3; cand < phi; cand+=2) { // optimization: skip evens
      if (gcd(cand, phi) === 1) {
          possibleEs.push(cand);
          if (possibleEs.length > 5) break; // just show first few
      }
  }

  // Derived state for table visualization
  const [modPowSteps, setModPowSteps] = useState([]);

  useEffect(() => {
    // Reset subsequent steps if primes change
    setE(null);
    setD(null);
    setEncryptedVal(null);
    setDecryptedVal(null);
  }, [p, q]);

  const handleCalculateD = () => {
    const val = modInverse(e, phi);
    setD(val);
  };

  const handleEncrypt = () => {
    const m = message.toUpperCase().charCodeAt(0) - 64; // A=1...
    if (m < 1 || m > 26) {
        alert("Please enter a letter A-Z");
        return;
    }

    // Visualization of square and multiply not fully implemented in helper,
    // but we can compute value directly.
    const c = modPow(m, e, n);
    setEncryptedVal(c);
  };

  const handleDecrypt = () => {
      const m = modPow(encryptedVal, d, n);
      setDecryptedVal(m);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      <NavBar />

      <div className="max-w-4xl mx-auto px-4 pt-10">
        <div className="mb-8">
            <Link to="/crypto" className="text-sm font-bold text-gray-500 hover:text-indigo-600 mb-2 inline-block">← Back to Course</Link>
            <h1 className="text-4xl font-extrabold text-gray-900">RSA: Locking with Math</h1>
            <p className="text-gray-600 mt-2 text-lg">Build public and private keys using prime numbers.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

            {/* Step 1: Choose Primes */}
            <StepCard number="1" title="Choose Two Primes" active={true}>
                <div className="flex gap-8 items-center flex-wrap">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Prime p</label>
                        <select
                            value={p}
                            onChange={(e) => setP(parseInt(e.target.value))}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-24 p-2.5"
                        >
                            {PRIMES.map(prime => <option key={prime} value={prime}>{prime}</option>)}
                        </select>
                    </div>
                    <div className="text-2xl text-gray-400">×</div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Prime q</label>
                         <select
                            value={q}
                            onChange={(e) => setQ(parseInt(e.target.value))}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-24 p-2.5"
                        >
                            {PRIMES.filter(prime => prime !== p).map(prime => <option key={prime} value={prime}>{prime}</option>)}
                        </select>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-xl text-blue-900">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="block text-xs uppercase tracking-wide opacity-70">Modulus (n)</span>
                            <span className="text-xl font-mono font-bold">n = {p} × {q} = {n}</span>
                        </div>
                        <div>
                            <span className="block text-xs uppercase tracking-wide opacity-70">Totient (φ)</span>
                            <span className="text-xl font-mono font-bold">φ(n) = ({p}-1)({q}-1) = {phi}</span>
                        </div>
                    </div>
                </div>
                <p className="mt-4 text-gray-600 text-sm">
                    We pick two primes because factoring their product <b>n</b> is hard for large numbers. <b>φ(n)</b> helps us find the keys.
                </p>
            </StepCard>

            {/* Step 2: Choose Public Exponent */}
            <StepCard number="2" title="Choose Public Exponent (e)" active={true}>
                <p className="mb-4 text-gray-600">
                    We need an <b>e</b> such that 1 &lt; e &lt; {phi} and gcd(e, {phi}) = 1.
                </p>
                <div className="flex flex-wrap gap-2">
                    {possibleEs.map(val => (
                        <button
                            key={val}
                            onClick={() => { setE(val); setD(null); setEncryptedVal(null); setDecryptedVal(null); }}
                            className={`px-4 py-2 rounded-lg font-mono font-bold border-2 ${e === val ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300'}`}
                        >
                            {val}
                        </button>
                    ))}
                </div>
                {e && (
                    <div className="mt-4 text-green-700 bg-green-50 p-3 rounded-lg inline-block">
                        ✓ gcd({e}, {phi}) = 1. Valid public key part.
                    </div>
                )}
            </StepCard>

            {/* Step 3: Compute Private Exponent */}
            <StepCard number="3" title="Find Private Exponent (d)" active={!!e}>
                 <p className="mb-4 text-gray-600">
                    Calculate <b>d</b> such that (d × e) % {phi} = 1.
                </p>
                <button
                    onClick={handleCalculateD}
                    disabled={!!d}
                    className={`px-6 py-2 rounded-lg font-bold text-white transition-colors ${d ? 'bg-gray-400 cursor-default' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                    {d ? 'Calculated' : 'Calculate d'}
                </button>

                {d && (
                    <div className="mt-6 p-4 bg-yellow-50 rounded-xl text-yellow-900 border border-yellow-100">
                        <span className="block text-xs uppercase tracking-wide opacity-70">Private Key (d)</span>
                        <div className="text-2xl font-mono font-bold">d = {d}</div>
                        <div className="text-sm mt-2 opacity-80">
                            Check: ({d} × {e}) % {phi} = {(d*e)%phi}
                        </div>
                    </div>
                )}
                 <p className="mt-4 text-gray-600 text-sm">
                    <b>d</b> is the secret key. It allows us to reverse the encryption.
                </p>
            </StepCard>

             {/* Step 4: Encrypt */}
             <StepCard number="4" title="Encrypt a Message" active={!!d}>
                <div className="flex items-end gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Message (Letter)</label>
                        <input
                            type="text"
                            maxLength={1}
                            value={message}
                            onChange={(e) => { setMessage(e.target.value); setEncryptedVal(null); setDecryptedVal(null); }}
                            className="w-16 h-16 text-center text-3xl font-mono border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none uppercase"
                        />
                    </div>
                    <div className="pb-4 text-gray-400">→</div>
                    <div className="pb-4 font-mono text-gray-600 font-bold">
                        m = {message.toUpperCase().charCodeAt(0) - 64 || '?'}
                    </div>
                    <button
                        onClick={handleEncrypt}
                        className="mb-1 px-6 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 ml-4"
                    >
                        Encrypt
                    </button>
                </div>

                {encryptedVal !== null && (
                    <div className="mt-6">
                        <div className="bg-gray-100 p-6 rounded-xl font-mono text-center">
                            <div className="text-sm text-gray-500 mb-1">Formula: c = m^e mod n</div>
                            <div className="text-3xl font-bold text-gray-900">
                                {message.toUpperCase().charCodeAt(0) - 64}^{e} mod {n} = {encryptedVal}
                            </div>
                        </div>
                    </div>
                )}
            </StepCard>

            {/* Step 5: Decrypt */}
            <StepCard number="5" title="Decrypt the Message" active={encryptedVal !== null}>
                <p className="mb-4 text-gray-600">
                    Use the private key <b>d</b> to recover the message.
                </p>
                <button
                    onClick={handleDecrypt}
                    className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-md"
                >
                    Decrypt
                </button>

                {decryptedVal !== null && (
                     <div className="mt-6 flex items-center justify-center gap-4 animate-pulse">
                         <div className="text-xl">Result:</div>
                         <div className="w-16 h-16 flex items-center justify-center bg-green-100 text-green-800 text-3xl font-bold rounded-xl border border-green-200">
                             {String.fromCharCode(decryptedVal + 64)}
                         </div>
                         <div className="text-gray-500 font-mono">(m = {decryptedVal})</div>
                     </div>
                )}
                 <p className="mt-4 text-gray-600 text-sm">
                    Because <b>d</b> is mathematically linked to <b>e</b> and <b>n</b>, raising the ciphertext to the power of <b>d</b> brings back the original number!
                </p>
            </StepCard>

        </div>
      </div>
    </div>
  );
};

export default RSALesson;
