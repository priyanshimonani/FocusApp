import React, { useState, useEffect } from 'react';
import quoteIcon from './quote-icon.svg';

export default function Quotes() {
  const [quote, setQuote] = useState({ quote: "Loading...", author: "" });
  
  useEffect(() => {
    getNewQuote();
  }, []); 

const getNewQuote = async () => {
  try {
    const response = await fetch('https://dummyjson.com/quotes/random');
    const data = await response.json();
    console.log('API Response:', data);
    setQuote({ quote: data.quote, author: data.author });
  } catch (error) {
    console.error('Error fetching quote:', error);
    setQuote({ quote: "Failed to load quote. Check console for error.", author: "" });
  }
};

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`"${quote.quote}" - ${quote.author}`);
    alert('copied to clipboard!');
  };

const shareOnTumblr = () => {
  if (quote) {
    const tumblrUrl = `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=motivation,quotes&caption=${encodeURIComponent(quote.author)}&content=${encodeURIComponent(quote.quote)}&canonicalUrl=https://yourapp.com`;
    window.open(tumblrUrl, '_blank');
  }
};

  const getCurrentDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <div className="container">
      <style>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 2rem;
          position: relative;
        }
        
        .date-display {
          position: absolute;
          top: 2rem;
          left: 2rem;
          font-family: "Lora", serif;
          font-size: 1rem;
          color: #1E1E1E;
        }
        
        .title {
          font-size: 2.5rem;
          margin-bottom: 2rem;
          font-family: "Raleway", sans-serif;
          font-weight: 600;
          color: #1E1E1E;
        }
        
        .card {
          background: linear-gradient(135deg, rgba(255,251,251,0.63), rgba(255,255,255,0.3));
          backdrop-filter: blur(8px);
          border-radius: 20px;
          padding: 0.5rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          max-width: 700px;
          width: 100%;
          position: relative;
          border: 2px solid #e0e0e0;
          min-height: 300px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        
        .quote-text {
          font-family: "Bodoni Moda", serif;
          font-size: 2rem;
          line-height: 1.5;
          color: #1E1E1E;
          margin: 0 0 2rem 0;
          text-align: left;
          padding: 2rem;
        }
        
        .quote-author {
          font-family: "Lora", serif;
          font-size: 1.1rem;
          color: #555;
          text-align: right;
          width: 90%;
          padding: 1rem;
        }
        
        .btn-group {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 2rem;
          flex-wrap: wrap;
        }
        
        .btn-group button {
          background-color: #FFFBB6;
          padding: 0.7rem 1.5rem;
          border-radius: 18px;
          border: 2px solid black;
          font-family: "Raleway", sans-serif;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .btn-group button:hover {
          background-color: #fff9a0;
          transform: translateY(-2px);
        }
        
        .btn-group button:active {
          transform: translateY(0);
        }
      `}</style>
      
      <div className="date-display">{getCurrentDate()}</div>

      <div className="card">
        <img src={quoteIcon} alt="quote icon" style={{ width: '80px', height: '80px', marginBottom: '0rem', alignSelf: 'flex-start' }} />
        <p className="quote-text">{quote.quote}</p>
        <p className="quote-author">— {quote.author}</p>
      </div>
      <div className="btn-group">
        <button onClick={getNewQuote}>New Quote</button>
        <button onClick={copyToClipboard}>Copy to Clipboard</button>
        <button onClick={shareOnTumblr}>Share on Tumblr</button>
      </div>
    </div>
  );
}