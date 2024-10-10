import React from 'react';
import videoBackground from '../videos/background.mp4';
import { useNavigate } from 'react-router-dom';
import SmoothGlassButton from './SmoothGlassButton.js';
import Grid from '@mui/material/Grid2/index.js';

function HomePage() {
  const navigate = useNavigate();

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center"
      style={{
        WebkitAppRegion: 'drag',
        position: 'relative',
        height: '100vh', // Full height of the view
        maxHeight: '750px',
        minWidth: '1050px'
      }}
    >
      <video autoPlay loop muted
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100vw',
          height: '100vh',
          objectFit: 'cover', // Maintain aspect ratio and cover the entire page
          zIndex: '-1', // Ensure the video stays behind the content
        }}
      >
        <source src={videoBackground} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

      {/* Center the content */}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{
          WebkitAppRegion: 'no-drag',
          maxWidth: '700px',
          maxHeight: '700px', // Ensures the grid takes the full height of the viewport
          marginBottom: '200px',
        }}
      >
        <Grid item>
          <h1 style={{ color: 'white', fontSize: '3rem', textAlign: 'center', marginBottom: '20px' }}>
            Welcome to Repair-Hub!
          </h1>
        </Grid>
        <Grid item>
          <p style={{ color: 'white', fontSize: '1.5rem', textAlign: 'center', marginBottom: '30px' }}>
            Track and manage all your car repairs in one place!
          </p>
        </Grid>
        <Grid item>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <SmoothGlassButton style={{ fontFamily: '"Fjalla One", sans-serif', fontSize: '25px' }} onClick={() => navigate('/add-car')}>
                Add Car
              </SmoothGlassButton>
            </Grid>
            <Grid item>
              <SmoothGlassButton style={{ fontFamily: '"Fjalla One", sans-serif', fontSize: '25px' }} onClick={() => navigate('/view-repairs')}>
                View Repairs
              </SmoothGlassButton>
            </Grid>
            <Grid item>
              <SmoothGlassButton style={{ fontFamily: '"Fjalla One", sans-serif', fontSize: '25px' }} onClick={() => navigate('/add-service')}>
                Add Service
              </SmoothGlassButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default HomePage;
