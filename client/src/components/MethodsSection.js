import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const tasks = [
  { 
    name: 'Segmentation', 
    methods: [
      {
        name: 'Method A', 
        databases: [
          { name: 'Database 1', benchmark: 'Benchmark A1', details: 'Metrics for Method A on Database 1 for Segmentation.' },
          { name: 'Database 2', benchmark: 'Benchmark A2', details: 'Metrics for Method A on Database 2 for Segmentation.' }
        ]
      },
      {
        name: 'Method B', 
        databases: [
          { name: 'Database 1', benchmark: 'Benchmark B1', details: 'Metrics for Method B on Database 1 for Segmentation.' },
          { name: 'Database 2', benchmark: 'Benchmark B2', details: 'Metrics for Method B on Database 2 for Segmentation.' }
        ]
      },
      {
        name: 'Method C', 
        databases: [
          { name: 'Database 1', benchmark: 'Benchmark C1', details: 'Metrics for Method C on Database 1 for Segmentation.' },
          { name: 'Database 2', benchmark: 'Benchmark C2', details: 'Metrics for Method C on Database 2 for Segmentation.' }
        ]
      }
    ]
  },
  { 
    name: 'Visualization', 
    methods: [
      {
        name: 'Method A', 
        databases: [
          { name: 'Database 1', benchmark: 'Benchmark A1', details: 'Metrics for Method A on Database 1 for Visualization.' },
          { name: 'Database 2', benchmark: 'Benchmark A2', details: 'Metrics for Method A on Database 2 for Visualization.' }
        ]
      },
      {
        name: 'Method B', 
        databases: [
          { name: 'Database 1', benchmark: 'Benchmark B1', details: 'Metrics for Method B on Database 1 for Visualization.' },
          { name: 'Database 2', benchmark: 'Benchmark B2', details: 'Metrics for Method B on Database 2 for Visualization.' }
        ]
      },
      {
        name: 'Method C', 
        databases: [
          { name: 'Database 1', benchmark: 'Benchmark C1', details: 'Metrics for Method C on Database 1 for Visualization.' },
          { name: 'Database 2', benchmark: 'Benchmark C2', details: 'Metrics for Method C on Database 2 for Visualization.' }
        ]
      }
    ]
  },
  { 
    name: 'Reconstruction', 
    methods: [
      {
        name: 'Method A', 
        databases: [
          { name: 'Database 1', benchmark: 'Benchmark A1', details: 'Metrics for Method A on Database 1 for Reconstruction.' },
          { name: 'Database 2', benchmark: 'Benchmark A2', details: 'Metrics for Method A on Database 2 for Reconstruction.' }
        ]
      },
      {
        name: 'Method B', 
        databases: [
          { name: 'Database 1', benchmark: 'Benchmark B1', details: 'Metrics for Method B on Database 1 for Reconstruction.' },
          { name: 'Database 2', benchmark: 'Benchmark B2', details: 'Metrics for Method B on Database 2 for Reconstruction.' }
        ]
      },
      {
        name: 'Method C', 
        databases: [
          { name: 'Database 1', benchmark: 'Benchmark C1', details: 'Metrics for Method C on Database 1 for Reconstruction.' },
          { name: 'Database 2', benchmark: 'Benchmark C2', details: 'Metrics for Method C on Database 2 for Reconstruction.' }
        ]
      }
    ]
  }
];

const MethodsSection = () => {
  const [selectedMethods, setSelectedMethods] = useState(
    tasks.map(task => task.methods[0].name)
  );
  const [selectedDatabases, setSelectedDatabases] = useState(
    tasks.map(task => task.methods[0].databases[0].name)
  );

  const handleMethodChange = (event, taskIndex) => {
    const newSelectedMethods = [...selectedMethods];
    const newSelectedDatabases = [...selectedDatabases];
    newSelectedMethods[taskIndex] = event.target.value;
    newSelectedDatabases[taskIndex] = tasks[taskIndex].methods.find(method => method.name === event.target.value).databases[0].name;
    setSelectedMethods(newSelectedMethods);
    setSelectedDatabases(newSelectedDatabases);
  };

  const handleDatabaseChange = (event, taskIndex) => {
    const newSelectedDatabases = [...selectedDatabases];
    newSelectedDatabases[taskIndex] = event.target.value;
    setSelectedDatabases(newSelectedDatabases);
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Tasks and Their Implementation Methods
      </Typography>
      <Grid container spacing={3}>
        {tasks.map((task, taskIndex) => {
          const selectedMethod = task.methods.find(method => method.name === selectedMethods[taskIndex]);
          const selectedDatabase = selectedMethod.databases.find(database => database.name === selectedDatabases[taskIndex]);
          return (
            <Grid item xs={12} sm={6} md={4} key={taskIndex}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {task.name}
                  </Typography>
                  <FormControl fullWidth variant="outlined" sx={{ marginBottom: '1rem' }}>
                    <InputLabel id={`method-select-label-${taskIndex}`}>Method</InputLabel>
                    <Select
                      labelId={`method-select-label-${taskIndex}`}
                      value={selectedMethods[taskIndex]}
                      onChange={(event) => handleMethodChange(event, taskIndex)}
                      label="Method"
                    >
                      {task.methods.map((method, index) => (
                        <MenuItem key={index} value={method.name}>
                          {method.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth variant="outlined" sx={{ marginBottom: '1rem' }}>
                    <InputLabel id={`database-select-label-${taskIndex}`}>Benchmark</InputLabel>
                    <Select
                      labelId={`database-select-label-${taskIndex}`}
                      value={selectedDatabases[taskIndex]}
                      onChange={(event) => handleDatabaseChange(event, taskIndex)}
                      label="Database"
                    >
                      {selectedMethod.databases.map((database, index) => (
                        <MenuItem key={index} value={database.name}>
                          {database.benchmark}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    {selectedDatabase.benchmark}
                  </Typography>
                  <Typography variant="body2">
                    {selectedDatabase.details}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default MethodsSection;
