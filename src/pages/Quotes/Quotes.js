import React, { useState } from 'react';

export default function Quotes() {
  const quotesLibrary = [
    { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { quote: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { quote: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
    { quote: "Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine.", author: "Roy T. Bennett" },
    { quote: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { quote: "Success is not how high you have climbed, but how you make a positive difference to the world.", author: "Roy T. Bennett" },
    { quote: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" }
  ];

  const [quote, setQuote] = useState(quotesLibrary[0]);

  const getNewQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotesLibrary.length);
    setQuote(quotesLibrary[randomIndex]);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`"${quote.quote}" - ${quote.author}`);
    alert('Quote copied to clipboard!');
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text="${encodeURIComponent(quote.quote)}" - ${encodeURIComponent(quote.author)}`;
    window.open(twitterUrl, '_blank');
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
          padding: 3rem;
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
          font-style: italic;
        }
        
        .quote-author {
          font-family: "Lora", serif;
          font-size: 1.1rem;
          color: #555;
          text-align: right;
          margin-bottom: 0;
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
        <p className="quote-text">"{quote.quote}"</p>
        <p className="quote-author">— {quote.author}</p>
      </div>
      
      <div className="btn-group">
        <button onClick={getNewQuote}>New Quote</button>
        <button onClick={copyToClipboard}>Copy to Clipboard</button>
        <button onClick={shareOnTwitter}>Share on Twitter</button>
      </div>
    </div>
  );
}