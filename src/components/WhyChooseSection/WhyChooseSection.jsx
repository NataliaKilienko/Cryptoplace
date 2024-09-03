import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaBitcoin, FaChartLine, FaUser } from 'react-icons/fa';
import './WhyChooseSection.css';

gsap.registerPlugin(ScrollTrigger);

const WhyChooseSection = () => {
  const sectionRef = useRef(null);
  const featuresRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current.querySelector('h2'),
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 25%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    featuresRef.current.forEach((feature, index) => {
      gsap.fromTo(
        feature,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: feature,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.3,
        }
      );
    });
  }, []);

  return (
    <section id="why-choose-section" className="why-choose-section" ref={sectionRef}>
      <div className="why-choose-content">
        <h2>Why Choose Cryptoplace?</h2>
        <p className="section-description">
          The rise of mobile devices transforms the way we consume information entirely and the world's most relevant channels such as Facebook and Instagram are almost exclusively used on mobile.
        </p>
      </div>
      <div className="features-container">
        <div className="feature" ref={(el) => (featuresRef.current[0] = el)}>
          <FaBitcoin className="feature-icon" />
          <h3>Real-Time Updates</h3>
          <p>Get the latest updates on cryptocurrency prices, market trends, and more.</p>
        </div>
        <div className="feature" ref={(el) => (featuresRef.current[1] = el)}>
          <FaChartLine className="feature-icon" />
          <h3>Comprehensive Analytics</h3>
          <p>Analyze market data with our comprehensive tools and insights.</p>
        </div>
        <div className="feature" ref={(el) => (featuresRef.current[2] = el)}>
          <FaUser className="feature-icon" />
          <h3>User-Friendly Interface</h3>
          <p>Navigate the crypto world with ease using our intuitive platform.</p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
