import { createContext, useEffect, useState, useCallback } from "react";
import { fetchCoinsWithPagination, fetchNews as fetchNewsApi, searchCoins, fetchCoinData } from '../api/coinApi';

// Create a context to hold and provide coin-related data throughout the application
export const CoinContext = createContext();

const CoinContextProvider = ({ children }) => {
    // State to store the list of coins
    const [coins, setCoins] = useState([]);
    // State to store the list of favorite coins
    const [favoriteCoins, setFavoriteCoins] = useState([]);
    // State to track the total number of pages for pagination
    const [totalPages, setTotalPages] = useState(0);
    // State to track the current page number for pagination
    const [currentPage, setCurrentPage] = useState(1);
    // State to store the currently selected currency (default is USD)
    const [currency, setCurrency] = useState({ name: "usd", symbol: "$" });
    // State to store the filter criteria for news
    const [filter, setFilter] = useState('all');
    // State to store the news articles
    const [news, setNews] = useState([]);
    // State to track loading status (for spinners, etc.)
    const [loading, setLoading] = useState(false);
    // State to store the search results
    const [searchResults, setSearchResults] = useState([]);
    // State to track if a search operation is in progress
    const [isSearching, setIsSearching] = useState(false);
    // State to store the current sort order for coin listings
    const [sortOrder, setSortOrder] = useState('market_cap_desc');
    // State to store the list of favorite coin IDs
    const [favorites, setFavorites] = useState([]);

    // Effect to load the favorite coins from local storage when the component mounts
    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    // Effect to save the favorite coins to local storage whenever the favorites state changes
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    // Function to load coins with pagination, currency, and sort order
    const loadCoins = useCallback(async (page = 1) => {
        setLoading(true);
        try {
            const perPage = 20; // Number of coins per page
            const data = await fetchCoinsWithPagination(currency.name, page, perPage, '', sortOrder);
            setCoins(data);

            if (page === 1) {
                const totalCoins = data.total || 14150; // Fallback to a default total if not provided
                setTotalPages(Math.ceil(totalCoins / perPage));
            }
        } catch (error) {
            console.error('Error loading coins:', error);
        } finally {
            setLoading(false);
        }
    }, [currency.name, sortOrder]);

    // Function to load the user's favorite coins
    const loadFavorites = useCallback(async () => {
        setLoading(true);
        try {
            if (favorites.length > 0) {
                const favoriteIds = favorites.join(','); // Join favorite IDs into a string
                const favoriteCoinsData = await fetchCoinsWithPagination(currency.name, 1, favorites.length, favoriteIds);
                setFavoriteCoins(favoriteCoinsData); // Set the favorite coins with the correct currency values
            } else {
                setFavoriteCoins([]); // Set to empty if no favorites
            }
        } catch (error) {
            console.error('Error loading favorite coins:', error);
        } finally {
            setLoading(false);
        }
    }, [favorites, currency.name]);

    // Re-fetch favorite coins when the currency changes
    useEffect(() => {
        loadFavorites();
    }, [currency.name, loadFavorites]);


    // Function to add a coin to the list of favorites
    const addFavorite = (coinId) => {
        setFavorites(prevFavorites => {
            const newFavorites = [...prevFavorites, coinId];
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    // Function to remove a coin from the list of favorites
    const removeFavorite = (coinId) => {
        setFavorites(prevFavorites => {
            const newFavorites = prevFavorites.filter(id => id !== coinId);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    // Function to load news based on the filter criteria and pagination
    const loadNews = useCallback(async (filter = 'all', currentPage = 1) => {
        setLoading(true);
        try {
            const data = await fetchNewsApi(filter, currentPage);
            if (!data.results || !Array.isArray(data.results)) {
                throw new Error('Unexpected response format');
            }
            // Append new results to the existing news if not on the first page
            setNews(prevNews => currentPage === 1 ? data.results : [...prevNews, ...data.results]);
        } catch (error) {
            console.error('Error loading news:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Function to search for coins based on a query
    const searchForCoins = useCallback(async (query) => {
        setLoading(true);
        setIsSearching(true);
        try {
            const data = await searchCoins(query);
            if (data.coins?.length > 0) {
                const coinsIds = data.coins.map(coin => coin.id).join(',');
                const coinsListData = await fetchCoinsWithPagination(currency.name, 1, 250, coinsIds);
                setSearchResults(coinsListData);
            } else {
                setSearchResults([]);
            }
            setTotalPages(1); // Set total pages to 1 for search results
        } catch (error) {
            console.error('Error searching coins:', error);
        } finally {
            setLoading(false);
        }
    }, [currency.name]);

    // Effect to load coins and news whenever the currency, page, or filter changes
    useEffect(() => {
        if (!isSearching) {
            loadCoins(currentPage);
            loadNews(filter);
        }
    }, [currency, loadCoins, currentPage, isSearching, filter]);

    // Context value to provide to the children components
    const contextValue = {
        coins,
        favoriteCoins,
        searchResults,
        loading,
        totalPages,
        currentPage,
        setCurrentPage,
        setTotalPages,
        currency,
        setCurrency,
        news,
        filter,
        setFilter,
        sortOrder,
        setSortOrder,
        favorites,
        addFavorite,
        removeFavorite,
        loadCoins,
        loadFavorites,
        searchForCoins,
        isSearching,
        setIsSearching,
        loadNews,
    };

    return (
        <CoinContext.Provider value={contextValue}>
            {children}
        </CoinContext.Provider>
    );
};

export default CoinContextProvider;
