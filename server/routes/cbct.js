// server/routes/cbct.js

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');  



const cbctToNumpy = (req, res) => {
  const filePath = req.params.filePath;

  console.log(filePath)
  
  const pythonProcess = spawn('python3', ['cbct_to_array.py', filePath]);
  
  let outputDir = '';

  pythonProcess.stdout.on('data', (data) => {
      outputDir += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Error from Python script: ${data}`);
    res.status(500).send('Error processing CBCT');
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python script exited with code ${code}`);

    // Read the output directory from the Python script
    outputDir = outputDir.toString().trim();

    // Define the directory paths
    const sideDir = path.join(outputDir, 'side');
    const topDir = path.join(outputDir, 'top');
    const frontDir = path.join(outputDir, 'front');

    // Function to read files from a directory
    const readFilesFromDirectory = (dirPath, subPath) => {
        return new Promise((resolve, reject) => {
            if (!fs.existsSync(dirPath)) {
                console.error(`Error: Directory does not exist: ${dirPath}`);
                return reject(`Error: Directory does not exist: ${dirPath}`);
            }

            fs.readdir(dirPath, (err, files) => {
                if (err) {
                    console.error(`Error reading image files from ${dirPath}:`, err);
                    return reject(`Error reading image files from ${dirPath}`);
                }

                // Construct URLs for the files
                const filePaths = files.map(file => path.join('cbct_slices', filePath, subPath, file));

                // convert the url images stored as an array here filePaths to base_64 
                const base64Images = filePaths.map(file => {
                    const base64 = fs.readFileSync(file, 'base64');
                    return base64;
                });

                resolve(base64Images);
            });
        });
    };

    // Read image files from all three directories
    Promise.all([
        readFilesFromDirectory(sideDir, 'side'),
        readFilesFromDirectory(topDir, 'top'),
        readFilesFromDirectory(frontDir, 'front')
    ]).then(([sideFiles, topFiles, frontFiles]) => {
        // convert 
        const imagePaths = {
            side: sideFiles,
            top: topFiles,
            front: frontFiles
        };
        res.json(imagePaths);
    }).catch(error => {
        console.error('Error reading image files:', error);
        res.status(500).send('Error reading image files');
    });
  });
};

module.exports = { cbctToNumpy };
