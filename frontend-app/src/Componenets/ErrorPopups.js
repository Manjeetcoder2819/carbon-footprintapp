import React from 'react';
import './ErrorPopup.css'; // Optional: if you have styles for the popup

const ErrorPopup = ({ message, position }) => {
  return (
    <div className="error-popup" style={{ top: position }}>
      {message}
    </div>
  );
};

export default ErrorPopup;
