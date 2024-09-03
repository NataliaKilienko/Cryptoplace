import React, { useEffect, useState, useRef } from 'react';
import './TopGainersAndLosers.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { fetchTopGainersAndLosers } from '../../api/coinApi';
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton';
import gsap from 'gsap';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopGainersAndLosers = () => {
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const gainersRef = useRef(null);
  const losersRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTopGainersAndLosers();

        const processCoins = (coins, condition, sort, sliceCount) => {
          let filteredCoins = coins
            .filter(condition)
            .sort(sort)
            .slice(0, sliceCount);

          if (filteredCoins.length < sliceCount) {
            const dummyData = Array(sliceCount - filteredCoins.length).fill({
              name: 'N/A',
              symbol: 'N/A',
              price_change_percentage_24h: 0
            });
            filteredCoins = [...filteredCoins, ...dummyData];
          }

          return filteredCoins;
        };

        const gainersData = processCoins(
          data,
          (coin) => coin.price_change_percentage_24h > 0.1,
          (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h,
          10
        );

        const losersData = processCoins(
          data,
          (coin) => coin.price_change_percentage_24h < -0.1,
          (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h,
          10
        );

        setGainers(gainersData);
        setLosers(losersData);
      } catch (error) {
        console.error('Error fetching top gainers and losers:', error);
      }
    };

    fetchData();

    const ctx = gsap.context(() => {
      gsap.from(gainersRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3,
      });

      gsap.from(losersRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        delay: 0.6,
      });
    }, gainersRef); 
    
    const intervalId = setInterval(fetchData, 5 * 60 * 1000);

    return () => {
      ctx.revert(); 
      clearInterval(intervalId);
    };
  }, []);

  const getChartData = (coins, color) => ({
    labels: coins.map((coin) => `${coin.name} | ${coin.symbol.toUpperCase()}`),
    datasets: [{
      label: '24h % Change',
      data: coins.map((coin) => coin.price_change_percentage_24h),
      backgroundColor: color,
      borderColor: color,
      borderWidth: 1,
    }],
  });

  const chartOptions = (suggestedMin, suggestedMax) => ({
    responsive: true,  
    scales: {
      x: {
        grid: { color: '#3a2f61' },
        ticks: {
          color: '#FFFFFF',
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        grid: { color: '#3a2f61' },
        ticks: { color: '#FFFFFF' },
        beginAtZero: false,
        suggestedMin,
        suggestedMax,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#2d204b',
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        borderColor: '#4500c6',
        borderWidth: 1,
        callbacks: {
          label: (tooltipItem) => ` ${tooltipItem.raw.toFixed(2)} %`,
        },
      },
    },
  });

  return (
    <div className="top-gainers-losers">
      <h2 ref={gainersRef}><FaArrowUp /> Top Gainers</h2>
      <p className="description">
        This chart shows the top cryptocurrencies with the highest price gains in the last 24 hours.
      </p>
      <div className="chart-container">
        <Bar data={getChartData(gainers, '#68c5ff')} options={chartOptions(0, 10)} />
      </div>

      <h2 ref={losersRef}><FaArrowDown /> Top Losers</h2>
      <p className="description">
        This chart shows the top cryptocurrencies with the largest price drops in the last 24 hours.
      </p>
      <div className="chart-container">
        <Bar data={getChartData(losers, '#FF6F61')} options={chartOptions(-15, 0)} />
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default TopGainersAndLosers;
