import React from 'react';

function Header({ searchQuery, onSearchChange, onToggleFilters }) {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">🎮</div>
            <h1 className="logo-text">GameDeals</h1>
          </div>
          
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
          </div>
          
          <button
            onClick={onToggleFilters}
            className="filter-toggle"
          >
            ⚙️ Filters
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;