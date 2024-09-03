import React, { useContext, useState, useEffect, useRef, useMemo } from 'react';
import './News.css';
import { CoinContext } from '../../context/CoinContext';
import { FaGlobe } from 'react-icons/fa';
import gsap from 'gsap';
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton';
import Spinner from '../../components/Spinner/Spinner';  

const News = () => {
    const { news, loadNews, loading } = useContext(CoinContext);  
    const [filter, setFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState('date');
    const [currentPage, setCurrentPage] = useState(1);
    const hasAnimated = useRef(false);

    useEffect(() => {
        loadNews(filter, currentPage);  
    }, [filter, currentPage, loadNews]);

    useEffect(() => {
        if (!hasAnimated.current && news.length > 0) {
            gsap.fromTo('.news-item', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 });
            hasAnimated.current = true;
        }
    }, [news]);

    const sortedNews = useMemo(() => {
        return [...news].sort((a, b) => {
            return sortOrder === 'date'
                ? new Date(b.published_at) - new Date(a.published_at)
                : b.votes.positive - a.votes.positive;
        });
    }, [news, sortOrder]);

    const handleFilterChange = (event) => {
        const newFilter = event.target.value;
        setFilter(newFilter);
        setCurrentPage(1);  
        loadNews(newFilter, 1);  
    };

    const handleLoadMore = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    if (loading && currentPage === 1) {
        return <Spinner />;  
    }

    if (!news.length && !loading) {
        return <p>No news available at the moment.</p>;
    }

    return (
        <div className="news">
            <div className="news-filters">
                <select className="select-dropdown" value={filter} onChange={handleFilterChange}>
                    <option value="all">All</option>
                    <option value="bullish">Bullish</option>
                    <option value="bearish">Bearish</option>
                    <option value="important">Important</option>
                </select>
                <select className="select-dropdown" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="date">Sort by Date</option>
                    <option value="popularity">Sort by Popularity</option>
                </select>
            </div>

            {sortedNews.map((item, index) => (
                <div key={index} className="news-item">
                    <div className="news-icon">
                        <FaGlobe />
                    </div>
                    <div className="news-content">
                        <h3>{item.title}</h3>
                        <div className="news-meta">
                            <p>{item.domain}</p>
                            <p>{new Date(item.published_at).toLocaleString()}</p>
                        </div>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">Read more</a>
                    </div>
                </div>
            ))}

            {loading && <Spinner />} 

            <button className="load-more-button" onClick={handleLoadMore} disabled={loading}>
                Load More
            </button>

            <ScrollToTopButton />
        </div>
    );
};

export default News;
