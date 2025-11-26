import React, { useState } from 'react';
import './SshGithubLesson.css';

// SVG icon for a locked padlock (Private Key)
const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ verticalAlign: 'middle', marginRight: '8px' }}>
    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
  </svg>
);

// SVG icon for an unlocked padlock (Public Key)
const OpenLockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ verticalAlign: 'middle', marginRight: '8px' }}>
    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h-1V3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v5h1V8h1v2.5a.5.5 0 0 1-1 0V8z"/>
  </svg>
);

// This component simulates the SSH key authentication process with GitHub.
const SshGithubLesson = () => {
  const [stage, setStage] = useState(0);

  const handleGenerateKeys = () => setStage(1);
  const handleUploadKey = () => setStage(2);
  const handleSimulatePush = () => setStage(3);

  return (
    <div>
      <div className="ssh-lesson-controls">
        <button onClick={handleGenerateKeys} disabled={stage > 0}>
          1. Generate SSH key pair
        </button>
        <button onClick={handleUploadKey} disabled={stage < 1 || stage > 1}>
          2. Upload public key to GitHub
        </button>
        <button onClick={handleSimulatePush} disabled={stage < 2}>
          3. Simulate git push
        </button>
      </div>

      {stage >= 1 && (
        <div className="ssh-lesson-stage">
          <h4>Stage 1: Generate Key Pair</h4>
          <div className="terminal">
            <p>$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"</p>
            <p># Creates: id_rsa (private key), id_rsa.pub (public key)</p>
          </div>
          <div className="ssh-lesson-flex-container">
            <div className="ssh-lesson-card">
              <h5>Local machine (HYDTEST)</h5>
              <p><LockIcon /> id_rsa – Private key (keep secret)</p>
              <p><OpenLockIcon /> id_rsa.pub – Public key (safe to share)</p>
            </div>
            {stage < 2 && (
              <div className="ssh-lesson-explanation">
                <p>Your laptop generates a key pair. The private key stays on disk. The public key is meant to be copied to services like GitHub.</p>
              </div>
            )}
            {stage >= 2 && (
              <>
                <div className="ssh-lesson-arrow">→</div>
                <div className="ssh-lesson-card">
                  <h5>GitHub</h5>
                  <p>Stores your *public* key</p>
                  <div className="ssh-lesson-public-key">
                    ssh-rsa AAAA... your_email@example.com
                  </div>
                </div>
              </>
            )}
          </div>
          {stage >= 2 && (
            <p>You paste only the public key into GitHub’s SSH settings. GitHub never sees your private key.</p>
          )}
        </div>
      )}

      {stage >= 3 && (
        <div className="ssh-lesson-stage">
          <h4>Stage 3: Simulate Git Push</h4>
          <div className="ssh-lesson-card" style={{ width: 'auto' }}>
            <p><strong>Step 1:</strong> You run: git push</p>
            <p><strong>Step 2:</strong> GitHub sends a challenge based on your public key.</p>
            <p><strong>Step 3:</strong> Your laptop proves it has the private key and signs the challenge.</p>
            <p><strong>Step 4:</strong> If the signature is valid, GitHub says: ‘Hi kvsanjayraju! You’ve successfully authenticated, but GitHub does not provide shell access.’</p>
          </div>
          <div className="ssh-lesson-result">
            <strong>Result:</strong> Passwordless login powered by asymmetric encryption (similar math ideas as RSA).
          </div>
        </div>
      )}
    </div>
  );
};

export default SshGithubLesson;
