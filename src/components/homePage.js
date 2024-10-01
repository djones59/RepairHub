//src/components/homePage.js
// this file contains the home page 
import React from 'react';
import './homePage.css'; 
import videoBackground from '../videos/background.mp4';
import { useNavigate } from 'react-router-dom';
function HomePage() {
    const navigate = useNavigate();
    return (
      <div className = "home-page" >
         <video autoPlay loop muted id="background-video">
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
        </video>
        <h1>Welcome to Repair-Hub!</h1>
        <p>Track and manage all your car repairs in one place!</p>
        <div className = "button-group" style={{ WebkitAppRegion: 'no-drag'}}>
          <button onClick={() => navigate('/add-car')}> Add Car </button>
          <button onClick={() => navigate('/view-repairs')}>View Repairs</button>
          <button onClick={() => navigate('/add-service')}>Add Service</button>
        </div>
      </div>
    );
  }
  
  export default HomePage;