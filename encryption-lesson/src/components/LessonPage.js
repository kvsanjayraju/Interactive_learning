import React, { useState } from 'react';

// To add, remove, or edit steps, modify the 'steps' array below.
const steps = [
  'Why we need encryption',
  'Symmetric encryption (AES)',
  'Asymmetric encryption (RSA)',
  'Hybrid (HTTPS style)',
  'Real-world examples (Wi-Fi, vaults)',
  'SSH & GitHub keys',
];

const LessonPage = ({ children }) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{
        width: '250px',
        borderRight: '1px solid #ccc',
        padding: '20px',
      }}>
        <h2>Encryption Lesson</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {steps.map((step, index) => (
            <li
              key={index}
              style={{
                padding: '10px',
                cursor: 'pointer',
                backgroundColor: activeStep === index ? '#eee' : 'transparent',
              }}
              onClick={() => setActiveStep(index)}
            >
              {step}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: 1, padding: '20px' }}>
        {/* The content for the active step is rendered here. */}
        {children[activeStep]}
      </div>
    </div>
  );
};

export default LessonPage;
