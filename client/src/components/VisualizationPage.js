import React, { useEffect, useState } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import CBCTViewer from './viewers/CBCTViewer';
import XRayViewer from './viewers/XRayViewer';
import STLViewer from './viewers/STLViewer';
import axios from 'axios';

const dataTypes = ['cbct', 'xray', 'teeth_stl', 'crown_teeth_stl'];

const VisualizationPage = () => {
  const [selectedDataType, setSelectedDataType] = useState(dataTypes[0]);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/patients');
        const processedPatients = processPatientData(response.data);
        setPatients(processedPatients);
        if (processedPatients.length > 0) {
          setSelectedPatient(processedPatients[0].value);
        }
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const processPatientData = (data) => {
    const patientScanMap = {};
    data.forEach((scan) => {
      const [patient, date] = scan.split('_');
      if (!patientScanMap[patient]) {
        patientScanMap[patient] = [];
      }
      patientScanMap[patient].push(date);
    });

    const processedData = [];
    Object.keys(patientScanMap).forEach((patient, patientIndex) => {
      patientScanMap[patient].forEach((scan, scanIndex) => {
        processedData.push({
          label: `Patient ${patientIndex + 1} Scan ${String.fromCharCode(65 + scanIndex)}`,
          value: `${patient}_${scan}`
        });
      });
    });

    return processedData;
  };

  const handlePatientChange = (event) => {
    setSelectedPatient(event.target.value);
  };

  const handleDataTypeChange = (event) => {
    setSelectedDataType(event.target.value);
  };

  const renderViewer = () => {
    switch (selectedDataType) {
      case 'cbct':
        return <CBCTViewer  patient={selectedPatient} />;
      case 'xray':
        return <XRayViewer patient={selectedPatient} />;
      case 'teeth_stl':
        return (
          <Canvas style={{ height: '500px' }} camera={{ position: [0, 0, 300], rotation: [30, 0, 0], fov: 10 }}>
            <STLViewer type="teeth" patient={selectedPatient} />
          </Canvas>
        );
      case 'crown_teeth_stl':
        return (
          <Canvas style={{ height: '500px' }} camera={{ position: [0, 0, 300], rotation: [90, 90, 90], fov: 10 }}>
            <STLViewer type="crown" patient={selectedPatient} />
          </Canvas>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Visualization
      </Typography>
      <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
        <InputLabel id="patient-select-label">Select Patient</InputLabel>
        <Select
          labelId="patient-select-label"
          value={selectedPatient}
          onChange={handlePatientChange}
        >
          {patients.map((patient, index) => (
            <MenuItem key={index} value={patient.value}>
              {patient.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
        <InputLabel id="data-type-select-label">Select Data Type</InputLabel>
        <Select
          labelId="data-type-select-label"
          value={selectedDataType}
          onChange={handleDataTypeChange}
        >
          {dataTypes.map((dataType, index) => (
            <MenuItem key={index} value={dataType}>
              {dataType.replace('_', ' ').toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ marginTop: '2rem', border: '1px solid #ccc' }}>
        {renderViewer()}
      </Box>
    </Box>
  );
};

export default VisualizationPage;
