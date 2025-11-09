import React, { useState } from 'react';
import OutputCard from './OutputCard';

function SplitMode({ onCopySuccess }) {
  const [splitInput, setSplitInput] = useState('');
  const [extractedHTML, setExtractedHTML] = useState('');
  const [extractedCSS, setExtractedCSS] = useState('');
  const [extractedJS, setExtractedJS] = useState('');

  const extractContent = (htmlContent) => {
    // Extract CSS
    const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
    const styles = [];
    let match;
    while ((match = styleRegex.exec(htmlContent)) !== null) {
      styles.push(match[1].trim());
    }
    const css = styles.join('\n\n');

    // Extract JavaScript
    const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
    const scripts = [];
    while ((match = scriptRegex.exec(htmlContent)) !== null) {
      if (!match[0].includes('src=')) {
        scripts.push(match[1].trim());
      }
    }
    const js = scripts.join('\n\n');

    // Extract HTML (remove style and script tags)
    const html = htmlContent
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .trim();

    setExtractedHTML(html || 'No HTML content found');
    setExtractedCSS(css || 'No CSS content found');
    setExtractedJS(js || 'No JavaScript content found');
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSplitInput(value);
    extractContent(value);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        setSplitInput(content);
        extractContent(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <section className="input-section">
        <h2 className="section-title">Input HTML File</h2>
        <div className="file-input-wrapper">
          <label htmlFor="split-file-input" className="file-input-label">
            📁 Choose HTML File
          </label>
          <input
            type="file"
            id="split-file-input"
            accept=".html,.htm"
            onChange={handleFileUpload}
          />
        </div>
        <textarea
          value={splitInput}
          onChange={handleInputChange}
          placeholder="Or paste your complete HTML file here..."
        />
        <div className="info-message">
          💡 Upload or paste an HTML file containing embedded CSS and JavaScript. The tool will automatically extract and separate them.
        </div>
      </section>

      <section className="output-section">
        <h2 className="section-title">Separated Files (Tap to Copy)</h2>
        <div className="output-grid">
          <OutputCard
            title="📄 HTML"
            content={extractedHTML}
            onCopySuccess={onCopySuccess}
          />
          <OutputCard
            title="🎨 CSS"
            content={extractedCSS}
            onCopySuccess={onCopySuccess}
          />
          <OutputCard
            title="⚡ JavaScript"
            content={extractedJS}
            onCopySuccess={onCopySuccess}
          />
        </div>
      </section>
    </>
  );
}

export default SplitMode;
