import React, { useState } from 'react';
import TextField from '@mui/material/TextField/index.js';

const GlowingTextField = ({ inputProps, sx, slotProps, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const borderRadius = '8px';
  const glowStyles = {
    boxShadow: isFocused
      ? '0 0 10px rgba(255, 255, 255, 0.8)'  // Strong glow on focus
      : isHovered
      ? '0 0 10px rgba(255, 255, 255, 0.5)'  // Light glow on hover
      : 'none',                              // No glow otherwise
    transition: 'box-shadow 0.3s ease-in-out',  // Smooth transition
    borderRadius: borderRadius,
  };

  return (
    <TextField
      {...props}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      inputProps={{...inputProps}}
      sx={{
        ...sx,  
        ...glowStyles, // Apply glow styles for hover/focus
      }}
      slotProps={{
        ...slotProps,  
      }}
    />
  );
};

export default GlowingTextField;
