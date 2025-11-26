import React from 'react';

// This is a reusable card component for each step in the lesson.
// You can customize the title and explanation by passing props.
const StepCard = ({ title, explanation, children }) => {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '20px',
    }}>
      {/* The title of the lesson step. */}
      <h2>{title}</h2>
      {/* The explanation for the lesson step. */}
      <p>{explanation}</p>
      <div>
        {/* Interactive simulations and other content are passed in as children. */}
        {children}
      </div>
    </div>
  );
};

export default StepCard;
