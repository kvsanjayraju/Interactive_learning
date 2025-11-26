import React from 'react';
import './BrilliantLesson.css';

const BrilliantLesson = () => {
  return (
    <div className="lesson-container">
      <header className="lesson-header">
        <h1 className="lesson-title">Symmetric vs. Asymmetric Encryption</h1>
      </header>
      <main className="concept-grid">
        <div className="concept-card">
          <div className="concept-icon">🔑</div>
          <h2 className="concept-title">Symmetric Encryption (AES)</h2>
          <p className="concept-description">
            Uses a single, shared secret key to both encrypt and decrypt information.
            It's like using the same key to lock and unlock a box.
          </p>
          <p className="key-analogy">
            Think of it as a house key. Anyone with a copy can get in.
          </p>
        </div>
        <div className="concept-card">
          <div className="concept-icon">🔓</div>
          <h2 className="concept-title">Asymmetric Encryption (RSA)</h2>
          <p className="concept-description">
            Uses a pair of keys: a public key to encrypt, and a private key to decrypt.
            The public key can be shared freely.
          </p>
          <p className="key-analogy">
            It's like having a mailbox with a slot (public key) but only you have the key (private key) to open it.
          </p>
        </div>
      </main>
    </div>
  );
};

export default BrilliantLesson;
