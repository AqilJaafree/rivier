// NewsBar.jsx
import React, { useState, useEffect } from 'react';
import './NewsBar.css';

const NewsBar = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://api.defidive.com/news/article/all/v2?page=1&tags_filter_list=btc&timeframe=1w',
          {
            headers: {
              'accept': 'application/json'
            }
          }
        );
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        setNews(data.articles || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchNews();
    
    // Refresh news every 5 minutes
    const intervalId = setInterval(fetchNews, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="news-bar">
        <h2 className="news-title">Crypto News</h2>
        <div className="news-loading">
          <span className="loading-spinner"></span>
          <p>Loading latest BTC news...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-bar">
        <h2 className="news-title">Crypto News</h2>
        <div className="news-error">
          <p>Unable to load news: {error}</p>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="news-bar">
      <h2 className="news-title">Crypto News</h2>
      <div className="news-list">
        {news.length === 0 ? (
          <p className="no-news">No recent news found.</p>
        ) : (
          news.slice(0, 5).map((article, index) => (
            <div key={article.id || index} className="news-item">
              {article.image_url && (
                <div className="news-image">
                  <img src={article.image_url} alt={article.title} />
                </div>
              )}
              <div className="news-content">
                <h3 className="news-headline">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </a>
                </h3>
                <p className="news-source">
                  {article.source} • {new Date(article.published_at).toLocaleDateString()}
                </p>
                <p className="news-snippet">{article.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="news-footer">
        <a 
          href="https://defidive.com/news" 
          target="_blank" 
          rel="noopener noreferrer"
          className="more-news-link"
        >
          View More News
        </a>
      </div>
    </div>
  );
};

export default NewsBar;