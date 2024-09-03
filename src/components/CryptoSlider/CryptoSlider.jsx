import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './CryptoSlider.css';

import {
  bitcoinIcon,
  ethereumIcon,
  cardanoIcon,
  dogeIcon,
  pepeIcon,
  solanaIcon,
  starknetIcon
} from '../../assets/img/icons/icons';

const CryptoSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="slick-slide"><img src={bitcoinIcon} alt="Bitcoin" /></div>
        <div className="slick-slide"><img src={ethereumIcon} alt="Ethereum" /></div>
        <div className="slick-slide"><img src={cardanoIcon} alt="Cardano" /></div>
        <div className="slick-slide"><img src={dogeIcon} alt="Doge" /></div>
        <div className="slick-slide"><img src={pepeIcon} alt="Pepe" /></div>
        <div className="slick-slide"><img src={solanaIcon} alt="Solana" /></div>
        <div className="slick-slide"><img src={starknetIcon} alt="Starknet" /></div>
      </Slider>
    </div>
  );
};

export default CryptoSlider;
