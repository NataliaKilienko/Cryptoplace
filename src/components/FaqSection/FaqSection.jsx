import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import './FaqSection.css';

gsap.registerPlugin(ScrollTrigger);

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  const questions = [
    {
      question: 'How to get real-time cryptocurrency updates?',
      answer: 'On our site, you can find real-time updates on cryptocurrency prices, market trends, and other essential data to help you stay informed.',
    },
    {
      question: 'How to use analytics tools on Cryptoplace?',
      answer: 'Our analytics tools allow you to analyze market data in detail, review price history, and monitor trends to make informed decisions.',
    },
    {
      question: 'How to navigate the Cryptoplace platform?',
      answer: 'Our user-friendly interface is designed to help you easily find the information you need, whether it’s market updates, analytics, or educational resources.',
    },
    {
      question: 'How do I add a coin to my favorites?',
      answer: 'You can add a coin to your favorites by clicking on the heart icon next to the coin\'s name. This allows you to quickly access and track your favorite coins on your dashboard.',
    },
  ];

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current.querySelector('h2'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 25%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    itemsRef.current.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.15,
        }
      );
    });
  }, []);

  return (
    <section className="faq-section" ref={sectionRef}>
      <h2>Frequently Asked Questions</h2>
      <p>If you have any questions, you might find the answer below. If not, feel free to contact us directly.</p>
      <div className="faq-container">
        {questions.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleQuestion(index)}
            ref={(el) => (itemsRef.current[index] = el)}
          >
            <div className="faq-question">
              <span>{item.question}</span>
              <span className="faq-toggle-icon">
                {activeIndex === index ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            </div>
            {activeIndex === index && <div className="faq-answer">{item.answer}</div>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
