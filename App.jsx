import { useState, useEffect } from 'react';
import './index.css'; // Ensure styles are applied

function App() {
  //variables 
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [color, setColor] = useState('#fff');
  const [isFading, setFading] = useState(false);
  //get quote
  const fetchQuote = async () => {
    
    try {
      setFading(true);

      const response = await fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json');
      const data = await response.json();
      
      const randomIndex = Math.floor(Math.random() * data.quotes.length);
      const randomQuote = data.quotes[randomIndex];
      
      const newColor = generateRandomColor();
      setQuote(randomQuote.quote);
      setAuthor(randomQuote.author);
      setColor(newColor);
      setFading(false);
      document.body.style.backgroundColor =newColor;
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const shareOnTwitter = () => {
    const tweet = encodeURIComponent(`${quote} — ${author}`);
    const url = `https://twitter.com/intent/tweet?text=${tweet}`;
  };

  useEffect(() => {
    fetchQuote();
  }, []);
  
  return (
      <div style={{ backgroundColor: 'white'}} id='quote-box'>
        <blockquote>
          <p className={isFading ? 'fade-out' : 'fade-in'} id='text'>{quote}</p>
          <footer className={isFading ? 'fade-out' : 'fade-in'} id='author'>- {author}</footer>
        </blockquote>
        <div className='button-container'>
        <button onClick={fetchQuote} id='new-quote'>New Quote</button>
        <a onClick={shareOnTwitter} id='tweet-quote'
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${quote} — ${author}`)}`}
        target="_blank"
        rel="noopener noreferrer">
        <i className="fab fa-twitter"></i>
        <p>tweet quote</p>
</a>
        </div>
      </div>
  );
}

export default App;
