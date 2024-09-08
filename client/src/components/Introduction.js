import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';


const IntroductionSection = () => {

  return (
    <Box sx={{ padding: '2rem', marginTop: "4rem" }}>
      <Grid container spacing={3}>
        <Typography variant="h6" gutterBottom textAlign="center">
        This project explores generating 3D teeth models from dental X-rays. We compare three methods: using panoramic X-rays, combining standard X-rays with pre-made teeth templates, and utilizing X-rays focused on teeth with crowns. By evaluating established metrics like accuracy and detail in the resulting models, we aim to identify the most effective approach based on the type of X-ray data available. This research contributes to advancements in creating accurate 3D teeth models from various X-ray sources.
        </Typography>

      </Grid>
    </Box>
  );
};

export default IntroductionSection;
