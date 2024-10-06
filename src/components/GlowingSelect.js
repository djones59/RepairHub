import React, { useState } from 'react';
import Select from '@mui/material/Select/index.js';
import MenuItem from '@mui/material/MenuItem/index.js';

const GlowingSelect = ({sx, selectedOption, setSelectedOption, ...props }) => {
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
    transition: 'box-shadow 0.3s ease-in-out',
    borderRadius: borderRadius,
  };

  return (
    <Select
      value={selectedOption}
      onChange={(e) => setSelectedOption(e.target.value)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      displayEmpty
      fullWidth
      sx={{
        fontFamily: '"Fjalla One", sans-serif',
        backgroundColor: '#333',
        color: 'white',
        borderRadius: borderRadius,
        ...sx,
        ...glowStyles,
    
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            backgroundColor: '#333',  // Dropdown background
            color: 'white',
          },
        },
      }}
      {...props}
    >
       <MenuItem style= {{fontFamily: "Fjalla One"}} value="search-all">Search All</MenuItem>
       <MenuItem style= {{fontFamily: "Fjalla One"}} value="Description">Description</MenuItem>
       <MenuItem style= {{fontFamily: "Fjalla One"}} value="Price">Price</MenuItem>
       <MenuItem style= {{fontFamily: "Fjalla One"}} value="Location">Location</MenuItem>
       <MenuItem style= {{fontFamily: "Fjalla One"}} value="Date">Date</MenuItem>
    </Select>
  );
};

export default GlowingSelect;
