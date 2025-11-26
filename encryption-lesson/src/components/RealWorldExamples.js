import React from 'react';

// You can add, remove, or edit the real-world examples in this array.
const examples = [
  {
    title: 'Wi-Fi Password (WPA2/WPA3)',
    description: 'When your phone connects to a Wi-Fi router, they use a hybrid encryption method to securely exchange the password.',
    type: 'Hybrid',
  },
  {
    title: 'Browser & Website (HTTPS)',
    description: 'Your browser and the website\'s server use a hybrid handshake to establish a secure connection for your data.',
    type: 'Hybrid',
  },
  {
    title: 'Password Vault Database',
    description: 'A password vault uses symmetric encryption to store your secrets in a database. Your master password is the key.',
    type: 'Symmetric',
  },
];

const RealWorldExamples = () => {
  return (
    <div>
      {examples.map((example, index) => (
        <div key={index} style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px',
        }}>
          <h4>{example.title}</h4>
          <p>{example.description}</p>
          <p><strong>Type:</strong> {example.type}</p>
        </div>
      ))}
    </div>
  );
};

export default RealWorldExamples;
