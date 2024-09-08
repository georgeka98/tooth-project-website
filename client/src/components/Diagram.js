import React from 'react';
import { Box, Typography } from '@mui/material';

const DiagramSection = () => {
  return (
    <Box sx={{ padding: '2rem', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Process for Generating Tooth
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="body1">CBCT File + Crown Teeth + Methods A, B, C = Whole Tooth with Root</Typography>
      </Box>
    </Box>
  );
};

export default DiagramSection;
