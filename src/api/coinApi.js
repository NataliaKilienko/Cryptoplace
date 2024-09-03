// API Keys for accessing CoinGecko and CryptoPanic APIs
const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY; // CoinGecko API Key
const CRYPTOPANIC_API_KEY = import.meta.env.VITE_CRYPTOPANIC_API_KEY; // CryptoPanic API Key

// Base URLs for APIs
const COINGECKO_API_BASE_URL = 'https://api.coingecko.com/api/v3/';
const CRYPTOPANIC_API_BASE_URL = 'https://cryptopanic.com/api/';

// Function to fetch a list of coins with pagination, filtering, and sorting
export const fetchCoinsWithPagination = async (currencyName, page = 1, perPage = 20, ids = '', order = 'market_cap_desc') => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': API_KEY, // Include the API key in the request headers
        },
    };

    try {
        const response = await fetch(
            `${COINGECKO_API_BASE_URL}coins/markets?vs_currency=${currencyName}&ids=${ids}&page=${page}&per_page=${perPage}&order=${order}`,
            options
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); // Handle non-OK HTTP responses
        }
        return await response.json(); // Parse and return the JSON data
    } catch (error) {
        console.error('Error fetching coin data:', error);
        throw error; // Rethrow the error for higher-level handling
    }
};

// Function to fetch the top gainers and losers in the cryptocurrency market
export const fetchTopGainersAndLosers = async () => {
    const url = new URL(`${COINGECKO_API_BASE_URL}coins/markets`);
    const params = {
        vs_currency: 'usd', // Specify the currency to compare against
        order: 'market_cap_desc', // Order by market cap descending
        per_page: '100', // Fetch top 100 coins
        page: '1',
        price_change_percentage: '24h', // Include 24-hour price change data
    };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key])); // Append parameters to the URL

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': API_KEY, // Include the API key in the request headers
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); // Handle non-OK HTTP responses
        }

        return await response.json(); // Parse and return the JSON data
    } catch (error) {
        console.error('Error fetching top gainers and losers:', error);
        throw error; // Rethrow the error for higher-level handling
    }
};

// Function to fetch detailed data for a specific cryptocurrency by its ID
export const fetchCoinData = async (coinId) => {
    try {
        const response = await fetch(`${COINGECKO_API_BASE_URL}coins/${coinId}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': API_KEY, // Include the API key in the request headers
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); // Handle non-OK HTTP responses
        }

        return await response.json(); // Parse and return the JSON data
    } catch (error) {
        console.error('Error fetching coin data:', error);
        throw error; // Rethrow the error for higher-level handling
    }
};

// Function to fetch historical data for a specific cryptocurrency by its ID, currency, and interval
export const fetchHistoricalData = async (coinId, currency, interval) => {
    try {
        const response = await fetch(
            `${COINGECKO_API_BASE_URL}coins/${coinId}/market_chart?vs_currency=${currency}&days=${interval}&interval=daily`,
            {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'x-cg-demo-api-key': API_KEY, // Include the API key in the request headers
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); // Handle non-OK HTTP responses
        }

        return await response.json(); // Parse and return the JSON data
    } catch (error) {
        console.error('Error fetching historical data:', error);
        throw error; // Rethrow the error for higher-level handling
    }
};

// Function to search for coins on the CoinGecko API
export const searchCoins = async (query) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': API_KEY, // Include the API key in the request headers
        },
    };

    try {
        const response = await fetch(
            `${COINGECKO_API_BASE_URL}search?query=${query}`,
            options
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); // Handle non-OK HTTP responses
        }

        return await response.json(); // Parse and return the JSON data
    } catch (error) {
        console.error('Error searching coin data:', error);
        throw error; // Rethrow the error for higher-level handling
    }
};

// Function to fetch cryptocurrency-related news with filtering options
export const fetchNews = async (filter = 'all', currentPage = 1) => {
    let filterParam = filter !== 'all' ? `&filter=${filter}` : ''; // Add filter to the URL if specified
    
    try {
        const response = await fetch(
            `${CRYPTOPANIC_API_BASE_URL}free/v1/posts/?auth_token=${CRYPTOPANIC_API_KEY}&currencies=BTC,ETH,XRP${filterParam}&page=${currentPage}`
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); // Handle non-OK HTTP responses
        }
        return await response.json(); // Parse and return the JSON data
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error; // Rethrow the error for higher-level handling
    }
};
