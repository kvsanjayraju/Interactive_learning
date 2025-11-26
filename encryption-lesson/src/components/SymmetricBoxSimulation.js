import React, { useState } from 'react';

// This component simulates symmetric encryption.
const SymmetricBoxSimulation = () => {
  // You can change the plaintext message here.
  const plaintextMessage = 'Hello Bob!';
  const [message, setMessage] = useState(plaintextMessage);
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // You can change the encrypted message (ciphertext) here.
  const encryptedMessage = 'aBcDeFgHiJkLmNoPqRsTuVwXyZ';

  const handleEncrypt = () => {
    setMessage(encryptedMessage);
    setIsEncrypted(true);
    setShowExplanation(true);
  };

  const handleDecrypt = () => {
    setMessage(plaintextMessage);
    setIsEncrypted(false);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <div>
          <p>Alice</p>
        </div>
        <div>
          <p>Shared Key: 🔑</p>
        </div>
        <div>
          <p>Bob</p>
        </div>
      </div>
      <div style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '20px',
        margin: '20px 0',
        fontFamily: 'monospace',
        fontSize: '18px',
        backgroundColor: '#f0f0f0',
      }}>
        {message}
      </div>
      <div>
        <button onClick={handleEncrypt} disabled={isEncrypted} style={{ marginRight: '10px', padding: '10px 20px' }}>
          Encrypt
        </button>
        <button onClick={handleDecrypt} disabled={!isEncrypted} style={{ padding: '10px 20px' }}>
          Decrypt
        </button>
      </div>
      {showExplanation && (
        <div style={{ marginTop: '20px' }}>
          {/* You can edit the explanation for symmetric encryption here. */}
          <p>
            <strong>Symmetric Encryption (AES):</strong> Alice and Bob use the same shared key to encrypt and decrypt the message. This method is very fast and efficient.
          </p>
        </div>
      )}
    </div>
  );
};

export default SymmetricBoxSimulation;
