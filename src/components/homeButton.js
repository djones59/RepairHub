import { useNavigate , useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
const HomeButton = () => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = (event) => {
    event.target.blur(); // Removes focus from the button after clicking
    setHover(false);  
    navigate('/');
  };
  if (location.pathname === '/') {
    return null;
  }
  return (
    <button className="custom-home-button" onClick={handleHomeClick}
        style={{ 
            WebkitAppRegion: 'no-drag',
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            backgroundColor: 'transparent',
            color: hover ? '#ccc' : 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'color 0.3s, color 0.3s',
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        >
        <span className="material-symbols-outlined" 
            style={{
                fontSize: '30px',
                padding: '5px',
                border: '0px solid gray'
            }}> home
        </span>
    </button>
  );
};

export default HomeButton;