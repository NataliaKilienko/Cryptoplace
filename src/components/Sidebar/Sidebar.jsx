import React, { useContext, useState, useEffect } from 'react';
import './Sidebar.css'; 
import { CoinContext } from '../../context/CoinContext';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaDollarSign, FaBlog, FaBitcoin, FaSearch, FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = () => {
  const { setCurrency } = useContext(CoinContext);
  const location = useLocation();
  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const paths = ['/', '/search', '/topGainersTopLosers', '/news'];
    let index = paths.indexOf(location.pathname);

    if (location.pathname.startsWith('/coin')) {
      index = 1; 
    }

    setActive(index !== -1 ? index : 0);
  }, [location.pathname]);

  const currencyHandler = (event) => {
    const currencies = {
      usd: { name: 'usd', symbol: '$' },
      eur: { name: 'eur', symbol: '€' },
      uah: { name: 'uah', symbol: '₴' }
    };
    setCurrency(currencies[event.target.value] || currencies['usd']);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: 'Home', icon: <FaHome />, link: '/' },
    { name: 'Search', icon: <FaSearch />, link: '/search' },
    { name: 'Top Gainers and Top Losers', icon: <FaDollarSign />, link: '/topGainersTopLosers' },
    { name: 'News', icon: <FaBlog />, link: '/news' }
  ];

  return (
    <>
      <button className="burger-menu" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="inner">
          <div className="header">
            <FaBitcoin className="logo-icon" />
            <h1 className="logo-text">Cryptoplace</h1>
          </div>
          <nav className="menu">
            {navItems.map((item, index) => (
              <Link to={item.link} key={item.name}>
                <button
                  className={active === index ? 'active' : ''}
                  onClick={() => {
                    setActive(index);
                    setIsOpen(false); 
                  }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              </Link>
            ))}
          </nav>
          <div className="nav-right">
            <div className="currency-selector">
              <select onChange={currencyHandler} className="currency-select">
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="uah">UAH</option>
              </select>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
