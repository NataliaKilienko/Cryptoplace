import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SubscribeSection.css';

gsap.registerPlugin(ScrollTrigger);

const SubscribeSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const formRef = useRef(null);
  const telegramRef = useRef(null);

  useEffect(() => {
    const elements = [headingRef.current, paragraphRef.current, formRef.current, telegramRef.current];
    
    gsap.fromTo(
      elements,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2, 
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse',
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="subscribe-section">
      <h2 ref={headingRef}>Get the Latest Cryptoplace Updates</h2>
      <p ref={paragraphRef}>Be the first to know about the latest trends and updates in the cryptocurrency world!</p>
      <form ref={formRef} className="subscribe-form">
        <input
          type="email"
          className="subscribe-input"
          placeholder="Enter your email address"
        />
        <button type="submit" className="subscribe-button">
          Subscribe
        </button>
      </form>
      <p ref={telegramRef} className="telegram-prompt">
        Become part of our ever-growing community. <a href="https://t.me/cryptoplace">Join us on Telegram.</a>
      </p>
    </section>
  );
};

export default SubscribeSection;
