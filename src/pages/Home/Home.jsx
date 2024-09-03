import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './Home.css';
import bg from '../../assets/img/bg.jpg';
import CryptoSlider from '../../components/CryptoSlider/CryptoSlider';
import AnalyticsSection from '../../components/AnalyticsSection/AnalyticsSection';
import WhyChooseSection from '../../components/WhyChooseSection/WhyChooseSection';
import WorldMapSection from '../../components/WorldMapSection/WorldMapSection';
import FaqSection from '../../components/FaqSection/FaqSection';
import SubscriptionSection from '../../components/SubscribeSection/SubscribeSection';
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton';

const Home = () => {
  const textRef = useRef([]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    gsap.fromTo(textRef.current,
      { opacity: 0, scale: 0.8, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 1.5, stagger: 0.2, ease: 'power4.out' }
    );
  }, []);

  return (
    <>
      <div className="home">
        <div className="content" ref={(el) => (textRef.current[0] = el)}>
          <h1>Welcome to Cryptoplace</h1>
          <p ref={(el) => (textRef.current[1] = el)}>
            Cryptoplace is your one-stop destination for exploring the exciting world of cryptocurrencies.
            Stay ahead of the market with our real-time updates, detailed insights, and comprehensive analytics.
            Whether you're a seasoned trader or a newcomer to the crypto space, Cryptoplace provides the tools
            and information you need to make informed decisions.
          </p>
        </div>
        <div className="image-container">
          <img src={bg} alt="Cryptoplace" className="full-screen-image" />
        </div>
        <CryptoSlider />
        <div className="scroll-down" onClick={() => scrollToSection('analytics-section')}></div>
      </div>
      
      <AnalyticsSection />
      <WhyChooseSection />
      <WorldMapSection />
      <FaqSection />
      <SubscriptionSection />
      <ScrollToTopButton />
    </>
  );
};

export default Home;
