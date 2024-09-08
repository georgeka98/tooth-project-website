const path = require('path');
const fs = require('fs');

// Endpoint to fetch patient names
const getPatients = (req, res) => {
  const cbctDir = path.join(__dirname+"/../", 'data', 'crown_teeth');

  // Read directory and filter out files with .nii.gz extension
  fs.readdir(cbctDir, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return res.status(500).send('Error reading directory');
    }

    // get all files except hidden files
    files = files.filter(file => !file.startsWith('.'));
    const patients = files.map(file => path.basename(file.split('.')[0]));
    // from each patient, only include the XXXX_XXXXX and not the string before that
    patients.forEach((patient, index) => {
      patients[index] = patient.split('-')[1];
    });
    res.json(patients);
  });
}

module.exports = { getPatients };
