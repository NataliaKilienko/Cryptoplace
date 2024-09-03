import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Wave from 'react-wavify';
import './Footer.css';

const socialLinks = [
  { href: "https://www.facebook.com", icon: <FaFacebookF /> },
  { href: "https://www.twitter.com", icon: <FaTwitter /> },
  { href: "https://www.instagram.com", icon: <FaInstagram /> },
  { href: "https://www.linkedin.com", icon: <FaLinkedinIn /> },
];

const Footer = () => (
  <footer className='footer'>
    <div className="footer-content">
      <div className="footer-logo">
        <h2>Cryptoplace</h2>
      </div>
      <div className="social-media">
        {socialLinks.map(({ href, icon }, index) => (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            {icon}
          </a>
        ))}
      </div>
    </div>
    <div className="waveContainer">
      <Wave fill='#1e90ff' paused={false} options={{ height: 60, amplitude: 40, speed: 0.15, points: 3 }} className="wave1" />
      <Wave fill='#6495ed' paused={false} options={{ height: 80, amplitude: 45, speed: 0.2, points: 4 }} className="wave2" />
      <Wave fill='#87cefa' paused={false} options={{ height: 100, amplitude: 50, speed: 0.25, points: 5 }} className="wave3" />
    </div>
    <div className="footer-bottom">
      <p>Copyright © 2024, Cryptoplace - All Rights Reserved.</p>
    </div>
  </footer>
);

export default Footer;
