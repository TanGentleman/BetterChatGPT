import React, { useEffect, useRef, useState } from 'react';
import useHideOnOutsideClick from '@hooks/useHideOnOutsideClick';

const YouTubeSummarizer = () => {
  const inputRef = useRef(null);
  const [link, setLink] = useState('');
  const [response, setResponse] = useState('');
  
  // Apply the useHideOnOutsideClick hook to the outer div
  const [showElement, setShowElement, elementRef] = useHideOnOutsideClick();

  const handleLinkSubmit = async () => {
    try {
      const serverResponse = await fetch('/api/summarize', {
        method: 'POST',
        body: JSON.stringify({ link }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await serverResponse.json();
      setResponse(data.summary);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="relative max-wd-sm" ref={elementRef}>
      <button
        className="btn btn-neutral btn-small"
        aria-label="Link Summarizer"
        onClick={() => setShowElement(!showElement)}
      >
        Link Summarizer
      </button>
      {showElement && (
        <div className="absolute top-100 right-0 z-10 bg-white rounded-lg shadow-xl border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group dark:bg-gray-800 opacity-90">
          <div className="text-sm px-4 py-2 w-max">Link Summarizer</div>
          <input
            ref={inputRef}
            type="text"
            className="text-gray-800 dark:text-white p-3 text-sm border-none bg-gray-200 dark:bg-gray-600 m-0 w-full mr-0 h-8 focus:outline-none"
            value={link}
            placeholder="Enter link"
            onChange={(e) => setLink(e.target.value)}
          />
          <button className="btn btn-primary mt-2 ml-4" onClick={handleLinkSubmit}>
            Submit
          </button>
          {response && <div className="px-4 py-2 text-sm">{response}</div>}
        </div>
      )}
    </div>
  );
};

export default YouTubeSummarizer;
