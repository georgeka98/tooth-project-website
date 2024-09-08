import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid, Slider, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';

const CBCTViewer = (props) => {
  const { patient } = props;
  const elementRefFront = useRef(null);
  const elementRefSide = useRef(null);
  const elementRefTop = useRef(null);

  const [frontSliceIndex, setFrontSliceIndex] = useState(0);
  const [sideSliceIndex, setSideSliceIndex] = useState(0);
  const [topSliceIndex, setTopSliceIndex] = useState(0);

  const [frontSlices, setFrontSlices] = useState([]);
  const [sideSlices, setSideSlices] = useState([]);
  const [topSlices, setTopSlices] = useState([]);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (patient != null) {
      const fetchImageIds = async (patient) => {
        setLoading(true);
        const filePath = patient; // Replace with actual file path
        try {
          const response = await axios.get(`http://localhost:3001/cbct/${filePath}`);
          if (response.data) {
            if (response.data.side) {
              setSideSlices(response.data.side);
              setSideSliceIndex(Math.floor(response.data.side.length / 2));
              handleImageLoad('side', response.data.side[Math.floor(response.data.side.length / 2)]);
            }
            if (response.data.top) {
              setTopSlices(response.data.top);
              setTopSliceIndex(Math.floor(response.data.top.length / 2));
              handleImageLoad('top', response.data.top[Math.floor(response.data.top.length / 2)]);
            }
            if (response.data.front) {
              setFrontSlices(response.data.front);
              setFrontSliceIndex(Math.floor(response.data.front.length / 2));
              handleImageLoad('front', response.data.front[Math.floor(response.data.front.length / 2)]);
            }
            setLoading(false);
          }
        } catch (error) {
          console.error('Error processing CBCT:', error);
          setLoading(false);
        }
      };
      fetchImageIds(patient);
    }
  }, [patient]);

  const handleImageLoad = (imageType, sliceIndex) => {
    switch (imageType) {
      case 'front':
        if (elementRefFront.current) {
          elementRefFront.current.style.backgroundImage = `url(data:image/png;base64,${sliceIndex})`;
        }
        break;
      case 'side':
        if (elementRefSide.current) {
          elementRefSide.current.style.backgroundImage = `url(data:image/png;base64,${sliceIndex})`;
        }
        break;
      case 'top':
        if (elementRefTop.current) {
          elementRefTop.current.style.backgroundImage = `url(data:image/png;base64,${sliceIndex})`;
        }
        break;
      default:
        break;
    }
  };

  const handleFrontSliceChange = (event, newValue) => {
    setFrontSliceIndex(newValue);
    if (frontSlices.length > 0) {
      const imageUrl = frontSlices[newValue];
      handleImageLoad('front', imageUrl);
    }
  };

  const handleSideSliceChange = (event, newValue) => {
    setSideSliceIndex(newValue);
    if (sideSlices.length > 0) {
      const imageUrl = sideSlices[newValue];
      handleImageLoad('side', imageUrl);
    }
  };

  const handleTopSliceChange = (event, newValue) => {
    setTopSliceIndex(newValue);
    if (topSlices.length > 0) {
      const imageUrl = topSlices[newValue];
      handleImageLoad('top', imageUrl);
    }
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        CBCT Viewer
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box ref={elementRefFront} sx={{ width: '100%', height: '400px', backgroundColor: 'black', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', position: 'relative' }}>
            {loading && (
              <CircularProgress
                size={60}
                sx={{
                  color: 'white',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-30px',
                  marginLeft: '-30px',
                }}
              />
            )}
          </Box>
          <Typography variant="h6" textAlign="center">Front View</Typography>
          <Slider
            value={frontSliceIndex}
            min={0}
            max={frontSlices.length - 1}
            step={1}
            onChange={handleFrontSliceChange}
            sx={{ marginTop: '1rem' }}
            aria-labelledby="front-slice-slider"
          />
        </Grid>
        <Grid item xs={4}>
          <Box ref={elementRefSide} sx={{ width: '100%', height: '400px', backgroundColor: 'black', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', position: 'relative' }}>
            {loading && (
              <CircularProgress
                size={60}
                sx={{
                  color: 'white',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-30px',
                  marginLeft: '-30px',
                }}
              />
            )}
          </Box>
          <Typography variant="h6" textAlign="center">Side View</Typography>
          <Slider
            value={sideSliceIndex}
            min={0}
            max={sideSlices.length - 1}
            step={1}
            onChange={handleSideSliceChange}
            sx={{ marginTop: '1rem' }}
            aria-labelledby="side-slice-slider"
          />
        </Grid>
        <Grid item xs={4}>
          <Box ref={elementRefTop} sx={{ width: '100%', height: '400px', backgroundColor: 'black', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', position: 'relative' }}>
            {loading && (
              <CircularProgress
                size={60}
                sx={{
                  color: 'white',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-30px',
                  marginLeft: '-30px',
                }}
              />
            )}
          </Box>
          <Typography variant="h6" textAlign="center">Top View</Typography>
          <Slider
            value={topSliceIndex}
            min={0}
            max={topSlices.length - 1}
            step={1}
            onChange={handleTopSliceChange}
            sx={{ marginTop: '1rem' }}
            aria-labelledby="top-slice-slider"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CBCTViewer;
