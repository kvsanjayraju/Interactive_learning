import React, { useState } from 'react';

// This component simulates asymmetric encryption.
const AsymmetricPadlockSimulation = () => {
  // You can change the secret message here.
  const [message] = useState('Secret Message');
  const [encryptedMessage, setEncryptedMessage] = useState(message);
  const [aliceHasPublicKey, setAliceHasPublicKey] = useState(false);
  const [isEncrypted, setIsEncrypted] = useState(false);

  // You can change the encrypted message (ciphertext) here.
  const ciphertext = 'aBcDeFgHiJkLmNoPqRsTuVwXyZ';

  const handleShareKey = () => {
    setAliceHasPublicKey(true);
  };

  const handleEncrypt = () => {
    if (aliceHasPublicKey) {
      setEncryptedMessage(ciphertext);
      setIsEncrypted(true);
    } else {
      // This alert can be customized.
      alert("Alice needs Bob's public key first!");
    }
  };

  const handleDecrypt = () => {
    setEncryptedMessage(message);
    setIsEncrypted(false);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <div>
          <p>Alice</p>
          {aliceHasPublicKey && <p>Public Key: 🔓</p>}
        </div>
        <div>
          {/* A representation of an eavesdropper. */}
          <p>Eve (Cannot Decrypt)</p>
        </div>
        <div>
          <p>Bob</p>
          <p>Public Key: 🔓</p>
          <p>Private Key: 🔑</p>
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
        {encryptedMessage}
      </div>
      <div>
        <button onClick={handleShareKey} disabled={aliceHasPublicKey} style={{ marginRight: '10px', padding: '10px 20px' }}>
          Share Bob's Public Key
        </button>
        <button onClick={handleEncrypt} disabled={isEncrypted || !aliceHasPublicKey} style={{ marginRight: '10px', padding: '10px 20px' }}>
          Encrypt with Public Key
        </button>
        <button onClick={handleDecrypt} disabled={!isEncrypted} style={{ padding: '10px 20px' }}>
          Decrypt with Private Key
        </button>
      </div>
    </div>
  );
};

export default AsymmetricPadlockSimulation;
