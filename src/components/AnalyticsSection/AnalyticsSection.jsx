import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import featureImage from '../../assets/img/img_bitcoin.png';
import './AnalyticsSection.css';

gsap.registerPlugin(ScrollTrigger);

const AnalyticsSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const [header, ...contentElements] = contentRef.current.children;
      const image = imageRef.current;

      const animation = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 25%',
          toggleActions: 'play none none reverse',
        },
      });

      animation
        .from(header, {
          opacity: 0,
          scale: 0.8,
          duration: 1,
          ease: 'power3.out',
        })
        .from(contentElements, {
          opacity: 0,
          height: 0,
          duration: 1.1,
          ease: 'power2.inOut',
          stagger: 0.2,
        }, '-=0.5')
        .from(image, {
          opacity: 0,
          x: 100,
          rotation: 45,
          duration: 1.3,
          ease: 'elastic.out(1, 0.75)',
        }, '-=1');
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="analytics-section" className="analytics-section">
      <div ref={contentRef} className="analytics-content">
        <h2>Monitor Your Crypto Assets in Real-Time</h2>
        <p>
          Our platform offers real-time analytics and monitoring tools to keep you updated on your crypto investments. Track market trends, analyze performance, and make informed decisions.
        </p>
        <ul>
          <li>Live Market Updates</li>
          <li>Detailed Asset Performance</li>
          <li>Latest News</li>
        </ul>
      </div>
      <div ref={imageRef} className="analytics-image">
        <img src={featureImage} alt="Crypto Analytics" />
      </div>
    </section>
  );
};

export default AnalyticsSection;
