import React, { useState } from 'react';
import TextField from '@mui/material/TextField/index.js';

const GlowingTextField = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // Combine dynamic boxShadow with any other TextField styles
  const dynamicStyles = {
    boxShadow: isFocused
      ? '0 0 10px rgba(255, 255, 255, 0.8)'  // Strong glow on focus
      : isHovered
      ? '0 0 10px rgba(255, 255, 255, 0.5)'  // Light glow on hover
      : 'none',                              // No glow when not hovered or focused
    transition: 'box-shadow 0.3s ease-in-out',  // Smooth transition
    
  };

  return (
    <TextField
      variant="outlined"
      fullWidth
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      InputProps={{
        style: {
          border: 'none',
          ...dynamicStyles,    // Apply the dynamic styles
          color: 'white',
          backgroundColor: '#333',
          borderRadius: '5px',
          border: 'transparent',
          outline: 'none',
        },
      }}
      InputLabelProps={{
        style: { color: 'white' ,},
        
      }}
    />
  );
};

export default GlowingTextField;
