import React, { useState } from 'react';

function GameCard({ deal }) {
  const [isWishlisted, setIsWishlisted] = useState(deal.isWishlisted);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatReleaseDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  const formatReviewCount = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const getPlatformClass = (platform) => {
    return platform.toLowerCase().replace(' ', '-');
  };

  return (
    <div className="game-card">
      <div className="card-image-container">
        <div style={{ 
          aspectRatio: '16/9', 
          backgroundColor: '#374151',
          display: !imageLoaded ? 'block' : 'none'
        }} />
        <img
          src={deal.imageUrl}
          alt={deal.title}
          className="card-image"
          onLoad={() => setImageLoaded(true)}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
        
        <div className="card-badges">
          <span className={`platform-badge ${getPlatformClass(deal.platform)}`}>
            {deal.platform}
          </span>
          
          <div className="card-actions">
            {deal.discountPercentage > 0 && (
              <span className="discount-badge">
                -{deal.discountPercentage}%
              </span>
            )}
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
            >
              {isWishlisted ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{deal.title}</h3>
        
        <div className="card-meta">
          <div className="rating">
            <span className="star-icon">⭐</span>
            <span className="rating-value">{deal.rating}</span>
            <span>({formatReviewCount(deal.reviewCount)})</span>
          </div>
          <div>
            📅 {formatReleaseDate(deal.releaseDate)}
          </div>
        </div>
        
        <div className="categories">
          {deal.categories.slice(0, 3).map((category, index) => (
            <span key={index} className="category-tag">
              {category}
            </span>
          ))}
          {deal.categories.length > 3 && (
            <span className="category-tag">
              +{deal.categories.length - 3} more
            </span>
          )}
        </div>
        
        <div className="card-footer">
          <div className="price-section">
            {deal.discountPercentage > 0 && (
              <span className="original-price">
                ${deal.originalPrice.toFixed(2)}
              </span>
            )}
            <span className={`current-price ${deal.currentPrice === 0 ? 'free' : ''}`}>
              {deal.currentPrice === 0 ? 'FREE' : `$${deal.currentPrice.toFixed(2)}`}
            </span>
          </div>
          
          <button className="view-deal-btn">
            View Deal
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameCard;