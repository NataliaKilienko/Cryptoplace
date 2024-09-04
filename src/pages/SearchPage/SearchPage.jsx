import React, { useState, useRef, useContext, useEffect } from 'react';
import { CoinContext } from '../../context/CoinContext';
import gsap from 'gsap';
import './SearchPage.css';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Spinner from '../../components/Spinner/Spinner';
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton';

const SearchPage = () => {
  const {
    currency,
    coins,
    favoriteCoins,
    totalPages,
    currentPage,
    setCurrentPage,
    loading,
    loadCoins,
    searchResults,
    searchForCoins,
    isSearching,
    setIsSearching,
    sortOrder,
    setSortOrder,
    addFavorite,
    removeFavorite,
    favorites,
    loadFavorites,
  } = useContext(CoinContext);

  const [input, setInput] = useState('');
  const formRef = useRef(null);
  const cardsRef = useRef([]);
  const searchTimeoutRef = useRef(null);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    if (!isSearching) {
      loadCoins(currentPage);
    }
  }, [currency, sortOrder, currentPage]);

  useEffect(() => {
    if (isSearching) {
      searchForCoins(input);
    }
    if (showFavorites) {
      loadFavorites();
    }
  }, [currency]);

  const inputHandler = (event) => {
    const { value } = event.target;
    setInput(value);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (value) {
      setIsSearching(true);
      searchTimeoutRef.current = setTimeout(() => searchForCoins(value), 1000);
    } else {
      resetSearch();
    }
  };

  const searchHandler = (event) => event.preventDefault();

  const resetSearch = () => {
    setInput('');
    setIsSearching(false);
    loadCoins(1);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleMouseEffects = (e, index, action) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e ? e.clientX - rect.left : rect.width / 2;
    const y = e ? e.clientY - rect.top : rect.height / 2;

    const effects = {
      mousemove: {
        background: `radial-gradient(circle at ${x}px ${y}px, rgba(69, 0, 198, 0.2), rgba(45, 17, 77, 0.9))`,
        y: 0,
      },
      mouseleave: {
        background: `linear-gradient(135deg, rgba(28, 19, 64, 0.9) 0%, rgba(36, 28, 96, 0.8) 100%)`,
        y: 0,
      },
      mouseenter: {
        y: -10,
      },
    };

    gsap.to(card, {
      ...effects[action],
      ease: 'power3.out',
      duration: 0.3,
    });
  };

  const displayCoins = showFavorites ? favoriteCoins : isSearching ? searchResults : coins;

  const toggleFavorites = () => {
    setShowFavorites((prev) => !prev);
    if (!showFavorites) {
      loadFavorites();
    }
  };

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const jumpPages = (offset) => changePage(currentPage + offset);
  const goToFirstPage = () => changePage(1);
  const goToLastPage = () => changePage(totalPages);
  return (
    <div className="search-page">
      <div className="search-header">
        <form className="search-form" ref={formRef} onSubmit={searchHandler}>
          <input
            onChange={inputHandler}
            value={input}
            type="text"
            placeholder="Search cryptos..."
            required
          />
        </form>
        <button onClick={toggleFavorites} className="toggle-favorites-button">
          {showFavorites ? 'Return to Full List' : 'Show Favorites'}
        </button>
      </div>
      {!showFavorites && (
        <div className="sort-select">
          <label htmlFor="sortOrder">Sort By:</label>
          <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
            <option value="market_cap_desc">Market Cap Descending</option>
            <option value="market_cap_asc">Market Cap Ascending</option>
            <option value="volume_desc">Volume Descending</option>
            <option value="volume_asc">Volume Ascending</option>
            <option value="id_asc">ID Ascending</option>
            <option value="id_desc">ID Descending</option>
          </select>
        </div>
      )}
      <div className="crypto-cards">
        {loading ? (
          <Spinner />
        ) : displayCoins.length > 0 ? (
          displayCoins.map((item, index) => (
            <Link
              to={`/coin/${item.id}`}
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="crypto-card"
              onMouseMove={(e) => handleMouseEffects(e, index, 'mousemove')}
              onMouseLeave={(e) => handleMouseEffects(e, index, 'mouseleave')}
              onMouseEnter={(e) => handleMouseEffects(e, index, 'mouseenter')}
            >
              <div className="crypto-card-header">
                <img src={item.image || item.large} alt={item.name} className="crypto-icon" />
                <div className="crypto-name">
                  <p>{item.name}</p>
                  <span>{item.symbol.toUpperCase()}</span>
                </div>
              </div>
              <div className="crypto-card-body">
                <p className="crypto-rank">Rank: {item.market_cap_rank || 'N/A'}</p>
                <p className="crypto-price">{item.current_price ? `${currency.symbol}${item.current_price}` : 'Price not available'}</p>
                <p className="crypto-market-cap">Market Cap: {item.market_cap ? `${currency.symbol}${item.market_cap.toLocaleString()}` : 'N/A'}</p>
                <p className={`crypto-price-change ${item.price_change_percentage_24h < 0 ? 'negative' : 'positive'}`}>
                  24h Change: {item.price_change_percentage_24h ? `${item.price_change_percentage_24h.toFixed(2)}%` : 'N/A'}
                </p>
                <button
                  className="favorite-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    favorites.includes(item.id) ? removeFavorite(item.id) : addFavorite(item.id);
                  }}
                >
                  {favorites.includes(item.id) ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
            </Link>
          ))
        ) : (
          <div className="no-coins-message">
            {isSearching && input ? 'No coins match your search.' : 'No coins found.'}
          </div>
        )}
      </div>
      {!isSearching && !showFavorites && (
        <div className="pagination">
          <button onClick={goToFirstPage} disabled={currentPage === 1}>
            &laquo;
          </button>
          <button onClick={() => jumpPages(-5)} disabled={currentPage <= 5}>
            &lt;&lt;
          </button>
          <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
            &lt;
          </button>
          <span>{currentPage}</span>
          <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>
            &gt;
          </button>
          <button onClick={() => jumpPages(5)} disabled={currentPage > totalPages - 5}>
            &gt;&gt;
          </button>
          <button onClick={goToLastPage} disabled={currentPage === totalPages}>
            &raquo;
          </button>
        </div>
      )}
      <ScrollToTopButton />
    </div>
  );

};

export default SearchPage;
