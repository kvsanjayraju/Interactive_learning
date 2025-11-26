import React from 'react';
import './App.css';
import LessonPage from './components/LessonPage';
import StepCard from './components/StepCard';
import QuizCard from './components/QuizCard';
import SymmetricBoxSimulation from './components/SymmetricBoxSimulation';
import AsymmetricPadlockSimulation from './components/AsymmetricPadlockSimulation';
import HybridHandshakeSimulation from './components/HybridHandshakeSimulation';
import RealWorldExamples from './components/RealWorldExamples';
import SshGithubLesson from './components/SshGithubLesson';

function App() {
  return (
    <div className="App">
      <LessonPage>
        {/* Each StepCard below corresponds to a step in the lesson. */}
        {/* You can change the title and explanation for each step here. */}

        <StepCard
          title="Why we need encryption"
          explanation="Placeholder text for why we need encryption."
        >
          {/* You can customize the quiz for the first step here. */}
          <QuizCard
            question="What is the primary goal of encryption?"
            options={['To make data bigger', 'To hide data from unauthorized users', 'To make data load faster']}
            correctIndex={1}
            explanation="Encryption is used to protect data from being read by anyone who is not authorized to do so."
          />
        </StepCard>

        <StepCard
          title="Symmetric encryption (AES)"
          explanation="Placeholder text for symmetric encryption."
        >
          <SymmetricBoxSimulation />
        </StepCard>

        <StepCard
          title="Asymmetric encryption (RSA)"
          explanation="Placeholder text for asymmetric encryption."
        >
          <AsymmetricPadlockSimulation />
        </StepCard>

        <StepCard
          title="Hybrid (HTTPS style)"
          explanation="Placeholder text for hybrid encryption."
        >
          <HybridHandshakeSimulation />
        </StepCard>

        <StepCard
          title="Real-world examples (Wi-Fi, vaults)"
          explanation="Placeholder text for real-world examples."
        >
          <RealWorldExamples />
        </StepCard>

        <StepCard
          title="SSH & GitHub authentication"
          explanation="SSH uses asymmetric encryption. Your laptop keeps a private key, shares a public key with GitHub, and proves its identity without ever sending the private key across the network."
        >
          <SshGithubLesson />
        </StepCard>
      </LessonPage>
    </div>
  );
}

export default App;
