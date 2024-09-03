import React from 'react';
import Navbar from './components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Coin from './pages/Coin/Coin';
import TopGainersAndTopLosers from './pages/TopGainersAndLosers/TopGainersAndLosers';
import News from './pages/News/News';
import SearchPage from './pages/SearchPage/SearchPage';  
import Footer from './components/Footer/Footer';
import ScrollToTop from "./utils/scrollToTop";

const App = () => {
  return (
    <div className='app'>
      <ScrollToTop />
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/coin/:coinId' element={<Coin/>}/>
        <Route path='/topGainersTopLosers' element={<TopGainersAndTopLosers/>}/>
        <Route path='/news' element={<News/>}/> 
        <Route path='/search' element={<SearchPage/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
