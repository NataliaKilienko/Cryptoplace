import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WorldMapSection.css';

gsap.registerPlugin(ScrollTrigger);

const WorldMapSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const pointsRef = useRef([]);
  const mapRef = useRef(null);

  useEffect(() => {
    const animateMapSection = () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 25%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        mapRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }
      )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
          '-=1'
        )
        .fromTo(
          paragraphRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
          '-=0.8'
        );

      pointsRef.current.forEach((point, index) => {
        gsap.fromTo(
          point,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: point,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.2,
          }
        );
      });
    };

    animateMapSection();
  }, []);

  return (
    <section ref={sectionRef} className="world-map-section">
      <h2 ref={headingRef}>Explore Cryptoplace's Global Reach</h2>
      <p ref={paragraphRef}>
        Join millions of users around the world who trust Cryptoplace for reliable cryptocurrency insights and real-time market updates. Our platform spans across multiple countries, providing localized support and global access.
      </p>
      <div className="map-container">
        <div className="world-map" ref={mapRef}>
          {[
            { name: 'North America', top: '25%', left: '25%' },
            { name: 'Europe', top: '35%', left: '45%' },
            { name: 'Asia', top: '60%', left: '80%' },
            { name: 'Ukraine', top: '40%', left: '50%' },
          ].map((point, index) => (
            <div
              key={index}
              className="map-point"
              ref={(el) => (pointsRef.current[index] = el)}
              style={{ top: point.top, left: point.left }}
            >
              <span>{point.name}</span>
              <div className="pulse-ring"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorldMapSection;
