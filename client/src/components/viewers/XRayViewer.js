import React from 'react';
import PropTypes from 'prop-types';

const XRayViewer = ({ patient }) => {
  const imageUrl = `http://localhost:3001/data/xray/${patient}.png`;

  return (
    <div style={{ textAlign: 'center' , height: '500px', alignContent: "center"}}>
      <img src={imageUrl} alt={`X-Ray of ${patient}`} style={{ width: '100%', dislay: 'block' }} />
    </div>
  );
};

XRayViewer.propTypes = {
  patient: PropTypes.string.isRequired,
};

export default XRayViewer;
