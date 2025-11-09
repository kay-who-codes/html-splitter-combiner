import React, { useState } from 'react';
import './App.css';
import SplitMode from './components/SplitMode';
import CombineMode from './components/CombineMode';
import CopyFeedback from './components/CopyFeedback';

function App() {
  const [activeMode, setActiveMode] = useState('split');
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);

  const handleCopySuccess = () => {
    setShowCopyFeedback(true);
    setTimeout(() => setShowCopyFeedback(false), 2000);
  };

  return (
    <div className="container">
      <header>
        <h1>HTML Splitter & Combiner</h1>
        <p className="subtitle">Split or combine HTML, CSS, and JavaScript with one tap</p>
      </header>

      <div className="mode-toggle">
        <button
          className={`mode-btn ${activeMode === 'split' ? 'active' : ''}`}
          onClick={() => setActiveMode('split')}
        >
          Split HTML File
        </button>
        <button
          className={`mode-btn ${activeMode === 'combine' ? 'active' : ''}`}
          onClick={() => setActiveMode('combine')}
        >
          Combine Files
        </button>
      </div>

      {activeMode === 'split' ? (
        <SplitMode onCopySuccess={handleCopySuccess} />
      ) : (
        <CombineMode onCopySuccess={handleCopySuccess} />
      )}

      <CopyFeedback show={showCopyFeedback} />
    </div>
  );
}

export default App;
