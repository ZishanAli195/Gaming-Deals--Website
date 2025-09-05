import React from 'react';

const platforms = ['Steam', 'Epic Games', 'GOG', 'Ubisoft', 'EA', 'Xbox'];
const categories = ['Action', 'RPG', 'Adventure', 'Indie', 'FPS', 'Strategy', 'Simulation', 'Sports', 'Racing', 'Horror'];

function FilterSidebar({
  isOpen,
  selectedPlatforms,
  selectedCategories,
  priceRange,
  onPlatformToggle,
  onCategoryToggle,
  onPriceRangeChange,
  onClearFilters,
  onClose
}) {
  return (
    <>
      {isOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 40,
            display: window.innerWidth <= 1024 ? 'block' : 'none'
          }}
        />
      )}
      
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">🔧 Filters</h2>
          <button onClick={onClearFilters} className="clear-filters">
            Clear all
          </button>
        </div>

        <div className="filter-section">
          <h3>Platforms</h3>
          <div className="checkbox-group">
            {platforms.map((platform) => (
              <label key={platform} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={selectedPlatforms.includes(platform)}
                  onChange={() => onPlatformToggle(platform)}
                />
                <span className={`platform-${platform.toLowerCase().replace(' ', '-')}`}>
                  {platform}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h3>Categories</h3>
          <div className="checkbox-group">
            {categories.map((category) => (
              <label key={category} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => onCategoryToggle(category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h3>Price Range</h3>
          <div className="price-range">
            <input
              type="range"
              min="0"
              max="100"
              value={priceRange[1]}
              onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
              className="price-slider"
            />
            <div className="price-labels">
              <span>$0</span>
              <span>$100+</span>
            </div>
            <div className="price-value">
              Up to ${priceRange[1] === 100 ? '100+' : priceRange[1]}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default FilterSidebar;