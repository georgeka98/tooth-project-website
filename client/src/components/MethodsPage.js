import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import XRayImage from '../images/xray.png'; // Replace with your actual image path
import XRayTeethTemplateImage from '../images/xray_teeth_template.png'; // Replace with your actual image path
import XRayTeethCrownImage from '../images/xray_teeth_crown.png'; // Replace with your actual image path

const MethodsPage = () => {
  const methods = [
    {
      image: XRayImage,
      title: "X-Ray",
      description: "X-rays are used to capture detailed images of teeth structures. These images provide information on the positioning and condition of the teeth, which is essential for accurate modeling and diagnosis."
    },
    {
      image: XRayTeethTemplateImage,
      title: "X-Ray + Teeth Template",
      description: "Combining X-rays with dental CAD templates allows for the reconstruction of tooth shapes. The X-ray provides the root positions, while the template gives the general shape of the teeth, resulting in a more accurate model."
    },
    {
      image: XRayTeethCrownImage,
      title: "X-Ray + Teeth Crown",
      description: "Integrating X-rays with optical scans of the tooth crowns enables the creation of detailed 3D models. This method uses X-ray data to place the roots accurately, while the scans ensure the crowns' precision."
    }
  ];

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Methods
      </Typography>
      {methods.map((method, index) => (
        <Box key={index} mb={4}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs="auto">
              <img src={method.image} alt={method.title} style={{ height: '200px' }} />
            </Grid>
            <Grid item xs={12} md>
              <Typography variant="h5" component="h2" gutterBottom>
                {method.title}
              </Typography>
              <Typography variant="body1">
                {method.description}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Container>
  );
};

export default MethodsPage;
