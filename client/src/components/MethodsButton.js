import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';


const MethodsButton = () => {

    const handleMethodsButton = () => {
        window.location.href = '/methods';
    }


  return (
    <Box sx={{ padding: '2rem', marginTop: "4rem" }}>
      <Grid container spacing={3} justifyContent="center">
        <Typography variant="h6" gutterBottom textAlign="center">
            Each method is detailed explained here.
        </Typography>
        {/* button which opens the vizualizaiton page */}

      </Grid>
      
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleMethodsButton}
                >
                  Go to Methods
                </Button>
        </Box>
    </Box>
  );
};

export default MethodsButton;
