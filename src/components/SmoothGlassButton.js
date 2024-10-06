import React from 'react';
import Button from '@mui/material/Button/index.js';

const SmoothGlassButton = ({ children, onClick, ...props }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        fontFamily: '"Fjalla One", sans-serif',
        padding: '12px 24px',
        fontSize: '16px',
        textTransform: 'uppercase',
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Frosted glass effect
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        backdropFilter: 'blur(8px)', // Glass effect
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.6s ease, box-shadow 0.6s ease, transform 0.6s ease', // Smooth transitions
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.2)', // Slightly more frosted when hovered
          boxShadow: '0 6px 10px rgba(0, 0, 0, 0.2)', // Stronger shadow
          transform: 'translateY(-2px)',
        },
        '&:active': {
          transform: 'translateY(1px)', // Subtle press effect
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default SmoothGlassButton;
