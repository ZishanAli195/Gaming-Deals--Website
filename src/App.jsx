import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import FilterSidebar from './components/FilterSidebar';
import GameCard from './components/GameCard';
import { mockDeals } from './data/mockDeals';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState('discount');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedDeals = useMemo(() => {
    let filtered = mockDeals.filter((deal) => {
      const matchesSearch = deal.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPlatform = selectedPlatforms.length === 0 || selectedPlatforms.includes(deal.platform);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.some(cat => deal.categories.includes(cat));
      const matchesPrice = deal.currentPrice >= priceRange[0] && deal.currentPrice <= priceRange[1];
      
      return matchesSearch && matchesPlatform && matchesCategory && matchesPrice;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'discount':
          return b.discountPercentage - a.discountPercentage;
        case 'price-low':
          return a.currentPrice - b.currentPrice;
        case 'price-high':
          return b.currentPrice - a.currentPrice;
        case 'rating':
          return b.rating - a.rating;
        case 'release':
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedPlatforms, selectedCategories, priceRange, sortBy]);

  const handlePlatformToggle = (platform) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearAllFilters = () => {
    setSelectedPlatforms([]);
    setSelectedCategories([]);
    setPriceRange([0, 100]);
    setSearchQuery('');
  };

  const handleCloseSidebar = () => {
    setShowFilters(false);
  };

  return (
    <div className="app">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />
      
      <div className="container">
        <div className="main-layout">
          <FilterSidebar
            isOpen={showFilters}
            selectedPlatforms={selectedPlatforms}
            selectedCategories={selectedCategories}
            priceRange={priceRange}
            onPlatformToggle={handlePlatformToggle}
            onCategoryToggle={handleCategoryToggle}
            onPriceRangeChange={setPriceRange}
            onClearFilters={clearAllFilters}
            onClose={handleCloseSidebar}
          />
          
          <main className="content">
            <div className="content-header">
              <div>
                <h1 className="content-title">Gaming Deals</h1>
                <p className="deals-count">{filteredAndSortedDeals.length} deals found</p>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="discount">Highest Discount</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="release">Newest First</option>
              </select>
            </div>
            
            {filteredAndSortedDeals.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🎮</div>
                <h2 className="empty-title">No deals found</h2>
                <p className="empty-description">Try adjusting your filters or search terms</p>
                <button onClick={clearAllFilters} className="clear-all-btn">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="games-grid">
                {filteredAndSortedDeals.map((deal) => (
                  <GameCard key={deal.id} deal={deal} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;