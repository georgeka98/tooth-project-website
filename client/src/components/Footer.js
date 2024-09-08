import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#1976d2', color: 'white', textAlign: 'center', padding: '1rem' }}>
      <Typography variant="body1">&copy; 2024 Teeth Model Generator. All rights reserved.</Typography>
    </Box>
  );
};

export default Footer;
