import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';


const VizualizationButton = () => {

    const handleVisualizationButtonClick = () => {
        window.location.href = '/visualization';
    }


  return (
    <Box sx={{ padding: '2rem', marginTop: "4rem" }}>
      <Grid container spacing={3}  justifyContent="center">
        <Typography variant="h6" gutterBottom textAlign="center">
            We have compiled a whole dataset which we used to implement each method.
        </Typography>
        {/* button which opens the vizualizaiton page */}

      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleVisualizationButtonClick}
                >
                  Go to Visualization
                </Button>
        </Box>
    </Box>
  );
};

export default VizualizationButton;
