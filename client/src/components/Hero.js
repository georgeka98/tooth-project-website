import React from 'react';
import { Box, Typography } from '@mui/material';
import backgroundImage from '../images/background-hero.png'; // Ensure you have an image in the specified path

const Hero = () => {
  return (
    <Box
      sx={{
        height: '50vh',
        position: 'relative',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value to change overlay opacity
        }}
      />
      <Typography variant="h2" sx={{ zIndex: 1 }}>Teeth Model Generator</Typography>
    </Box>
  );
};

export default Hero;
