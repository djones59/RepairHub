import React from 'react';
import { useLocation } from 'react-router-dom';
import homeVideoBackground from '../videos/background.mp4';  // For the HomePage
import blurredVideoBackground from '../videos/background_blurred.mp4';  // For other pages

const Layout = ({ children }) => {
  const location = useLocation();

  // Check if the current route is the homepage or another page
  const isHomePage = location.pathname === '/';
  
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: '-1',
        }}
      >
        <source src={isHomePage ? homeVideoBackground : blurredVideoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={{ position: 'relative', zIndex: '1' }}>{children}</div>
    </div>
  );
};

export default Layout;
