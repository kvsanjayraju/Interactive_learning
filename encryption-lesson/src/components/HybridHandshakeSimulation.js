import React, { useState } from 'react';

// You can edit the steps of the hybrid handshake timeline here.
const steps = [
  "Alice creates a random AES key.",
  "Alice encrypts that AES key using Bob's RSA public key.",
  "Alice sends the encrypted AES key to Bob.",
  "Bob decrypts the AES key with his private key.",
  "Both sides now use the AES key for fast symmetric encryption.",
];

const HybridHandshakeSimulation = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => (prevStep < steps.length - 1 ? prevStep + 1 : prevStep));
  };

  return (
    <div>
      <h4>Hybrid Handshake Timeline</h4>
      <div style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
      }}>
        <ul style={{ paddingLeft: '20px' }}>
          {steps.map((step, index) => (
            <li key={index} style={{
              opacity: index <= currentStep ? 1 : 0.3,
              marginBottom: '10px',
              fontWeight: index === currentStep ? 'bold' : 'normal',
            }}>
              {step}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleNextStep} disabled={currentStep === steps.length - 1} style={{ padding: '10px 20px' }}>
        Next Step
      </button>
    </div>
  );
};

export default HybridHandshakeSimulation;
