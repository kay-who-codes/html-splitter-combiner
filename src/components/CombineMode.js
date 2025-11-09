import React, { useState, useEffect } from 'react';
import OutputCard from './OutputCard';

function CombineMode({ onCopySuccess }) {
  const [htmlInput, setHtmlInput] = useState('');
  const [cssInput, setCssInput] = useState('');
  const [jsInput, setJsInput] = useState('');
  const [combinedHTML, setCombinedHTML] = useState('');

  useEffect(() => {
    combineContent();
  }, [htmlInput, cssInput, jsInput]);

  const combineContent = () => {
    const html = htmlInput.trim();
    const css = cssInput.trim();
    const js = jsInput.trim();

    if (!html && !css && !js) {
      setCombinedHTML('No content yet');
      return;
    }

    let result = html;

    // Add CSS if present
    if (css) {
      const styleTag = `<style>\n${css}\n</style>`;
      if (result.includes('</head>')) {
        result = result.replace('</head>', `${styleTag}\n</head>`);
      } else if (result.includes('<head>')) {
        result = result.replace('<head>', `<head>\n${styleTag}`);
      } else {
        result = styleTag + '\n' + result;
      }
    }

    // Add JS if present
    if (js) {
      const scriptTag = `<script>\n${js}\n</script>`;
      if (result.includes('</body>')) {
        result = result.replace('</body>', `${scriptTag}\n</body>`);
      } else {
        result = result + '\n' + scriptTag;
      }
    }

    setCombinedHTML(result || 'No content generated');
  };

  return (
    <>
      <section className="input-section">
        <h2 className="section-title">Input Separate Files</h2>
        <div className="combine-inputs">
          <div className="input-group">
            <label className="input-label">📄 HTML Content</label>
            <textarea
              value={htmlInput}
              onChange={(e) => setHtmlInput(e.target.value)}
              placeholder="Paste your HTML content here..."
            />
          </div>
          <div className="input-group">
            <label className="input-label">🎨 CSS Content</label>
            <textarea
              value={cssInput}
              onChange={(e) => setCssInput(e.target.value)}
              placeholder="Paste your CSS content here..."
            />
          </div>
          <div className="input-group">
            <label className="input-label">⚡ JavaScript Content</label>
            <textarea
              value={jsInput}
              onChange={(e) => setJsInput(e.target.value)}
              placeholder="Paste your JavaScript content here..."
            />
          </div>
        </div>
        <div className="info-message">
          💡 Paste your HTML, CSS, and JavaScript separately. The tool will combine them into a single HTML file.
        </div>
      </section>

      <section className="output-section">
        <h2 className="section-title">Combined HTML File (Tap to Copy)</h2>
        <OutputCard
          title="📦 Complete HTML File"
          content={combinedHTML}
          onCopySuccess={onCopySuccess}
        />
      </section>
    </>
  );
}

export default CombineMode;
