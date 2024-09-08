const express = require('express');
const { cbctToNumpy } = require('./routes/cbct');
const { getPatients } = require('./routes/patients');
const cors = require('cors');
const path = require('path');  

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());


// Directory where CBCT slices will be stored
const cbctSlicesDir = path.join(__dirname, 'cbct_slices');

const crown_teethDir = path.join(__dirname, 'data/crown_teeth');
const teethDir = path.join(__dirname, 'data/teeth');
const xrayDir = path.join(__dirname, 'data/xray');

// get /

app.get('/', (req, res) => {
  res.send("Hello World");
});
// Serve the images statically
console.log(xrayDir);
app.use('/cbct_slices', express.static(cbctSlicesDir));
app.use('/data/crown_teeth', express.static(crown_teethDir));
app.use('/data/teeth', express.static(teethDir));
app.use('/data/xray', express.static(xrayDir));

app.get('/cbct/:filePath', cbctToNumpy);
app.get('/api/patients', getPatients);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});