import React, { useState } from 'react';

// This component is an interactive quiz card.
// You can change the question, options, correct answer, and explanation by passing props.
const QuizCard = ({ question, options, correctIndex, explanation }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleOptionClick = (index) => {
    setSelectedOption(index);
    setIsCorrect(index === correctIndex);
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '20px',
    }}>
      {/* The quiz question. */}
      <h4>{question}</h4>
      <div>
        {/* The list of multiple-choice options. */}
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            style={{
              display: 'block',
              width: '100%',
              padding: '10px',
              margin: '5px 0',
              textAlign: 'left',
              backgroundColor: selectedOption === index ? (isCorrect ? 'lightgreen' : 'salmon') : '#f0f0f0',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {option}
          </button>
        ))}
      </div>
      {selectedOption !== null && (
        <div>
          {/* Feedback and explanation are shown after an option is selected. */}
          <p>{isCorrect ? 'Correct!' : 'Incorrect.'}</p>
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
};

export default QuizCard;
