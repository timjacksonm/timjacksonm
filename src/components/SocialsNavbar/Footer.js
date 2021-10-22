import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: '#022949',
        display: 'flex',
        width: '100%',
        padding: '2em 0',
        position: 'relative',
        color: '#fff',
        fontFamily: 'CalibreBoldItalic',
        fontSize: 'clamp(1rem, 4vw, 1.25rem)',
      }}
    >
      <a href="/#" style={{ textDecoration: 'none' }}>
        <FaArrowUp
          size="2rem"
          style={{
            position: 'absolute',
            top: 0,
            right: '50%',
            fill: '#55BDCA',
            margin: '0.5em 0',
          }}
        />
      </a>
      <p style={{ width: '100%', textAlign: 'center' }}>
        Designed & Built by Timothy Jackson
      </p>
    </div>
  );
};

export default Footer;
