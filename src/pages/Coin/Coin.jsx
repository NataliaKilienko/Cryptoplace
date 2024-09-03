import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';
import Spinner from '../../components/Spinner/Spinner';
import './Coin.css';
import { FaChartLine, FaDollarSign, FaTag, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { fetchCoinData, fetchHistoricalData } from '../../api/coinApi';
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton';

const formatPrice = (price) => {
  if (price === undefined || price === null) return "No data available";
  if (price >= 1) return price?.toFixed(2);
  if (price >= 0.01) return price?.toFixed(4);
  return price?.toFixed(6);
};

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [interval, setInterval] = useState('30');
  const { currency } = useContext(CoinContext);

  useEffect(() => {
    const loadCoinData = async () => {
      try {
        const data = await fetchCoinData(coinId);
        setCoinData(data);
      } catch (error) {
        console.error('Error loading coin data:', error);
      }
    };

    const loadHistoricalData = async () => {
      try {
        const data = await fetchHistoricalData(coinId, currency.name, interval);
        setHistoricalData(data);
      } catch (error) {
        console.error('Error loading historical data:', error);
      }
    };

    loadCoinData();
    loadHistoricalData();
  }, [coinId, currency.name, interval]);

  if (!coinData || !historicalData) {
    return <Spinner />;
  }

  return (
    <section className='coin'>
      <header className="coin-name">
        <img src={coinData.image.large} alt={`${coinData.name} logo`} />
        <p>
          <b>{coinData.name} ({coinData.symbol.toUpperCase()})</b>
        </p>
      </header>

      <div className="interval-selector">
        {['1', '7', '30', '365'].map((day) => (
          <button key={day} onClick={() => setInterval(day)}>
            {day === '1' ? '1 Day' : `${day} Days`}
          </button>
        ))}
      </div>

      <article className="coin-chart">
        <LineChart key={currency.name} historicalData={historicalData} />
      </article>

      <article className="coin-info">
        {[
          { icon: <FaTag />, label: 'Crypto Market Rank', value: coinData.market_cap_rank !== undefined ? coinData.market_cap_rank : "No data available" },
          { icon: <FaDollarSign />, label: 'Current Price', value: `${currency.symbol} ${formatPrice(coinData.market_data.current_price[currency.name])}` },
          { icon: <FaChartLine />, label: 'Market Cap', value: coinData.market_data.market_cap[currency.name] !== undefined ? `${currency.symbol} ${coinData.market_data.market_cap[currency.name]?.toLocaleString()}` : "No data available" },
          { icon: <FaArrowUp />, label: '24 Hour High', value: `${currency.symbol} ${formatPrice(coinData.market_data.high_24h[currency.name])}` },
          { icon: <FaArrowDown />, label: '24 Hour Low', value: `${currency.symbol} ${formatPrice(coinData.market_data.low_24h[currency.name])}` },
        ].map(({ icon, label, value }, idx) => (
          <div key={idx} className="info-block">
            <div className="info-icon">{icon}</div>
            <p>{label}</p>
            <span>{value}</span>
          </div>
        ))}
      </article>
      <ScrollToTopButton />
    </section>
  );
};

export default Coin;
