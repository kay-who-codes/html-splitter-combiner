import React, { useState } from 'react';

function OutputCard({ title, content, onCopySuccess }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    const invalidContent = [
      'No content yet',
      'No HTML content found',
      'No CSS content found',
      'No JavaScript content found',
      'No content generated'
    ];

    if (content && !invalidContent.includes(content)) {
      try {
        await navigator.clipboard.writeText(content);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1000);
        onCopySuccess();
      } catch (err) {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard. Please try again.');
      }
    } else {
      alert('No content available to copy!');
    }
  };

  return (
    <div
      className={`output-card ${isCopied ? 'copied' : ''}`}
      onClick={handleCopy}
    >
      <div className="output-card-title">
        <span>{title}</span>
        <span className="copy-icon">📋</span>
      </div>
      <div className="output-preview">{content}</div>
    </div>
  );
}

export default OutputCard;
