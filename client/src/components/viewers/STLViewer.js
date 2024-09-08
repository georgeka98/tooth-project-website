import React, { useState, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OrbitControls, Plane, GridHelper, Box } from '@react-three/drei';
import { MeshStandardMaterial } from 'three';

const STLViewer = (props) => {

  const { type, patient } = props;

  const [geometry, setGeometry] = useState(null);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    
    if(patient != null && type != null){
      const modelPath = type === 'teeth' ? 'http://localhost:3001/data/teeth/whole-teeth-'+patient+'.stl' : 'http://localhost:3001/data/crown_teeth/teeth-'+patient+'.stl';
      console.log(modelPath, patient)
      const loader = new STLLoader();
      loader.load(
        modelPath,
        (geom) => {
          setError(null);
          console.log(geom)
          setGeometry(geom);
        },
        undefined,
        (err) => {
          setGeometry(null);
          setError('Error loading STL file: ' + err.message);
        }
      );
    }
  }, [type, patient]);

  if (error) {
    console.log(error);
    return <Box>Error loading STL file: {error}</Box>;
  }

  // if (error) {
  //   console.log(error)
  //   return <mesh><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color="red" /></mesh>;
  // }

  // if (!geometry) {
  //   console.log('No geometry', geometry)
  //   return <mesh><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color="gray" /></mesh>;
  // }

  return (
    <>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[-5, -5, -5]} intensity={1} />
        {geometry ? (
          <mesh geometry={geometry} rotation={[-Math.PI/2, 0, 0 ]} position={[0,0,0]}>
            <meshStandardMaterial color="white" />
          </mesh>
        ) : null}
        <OrbitControls />
    </>
  );
};

export default STLViewer;
