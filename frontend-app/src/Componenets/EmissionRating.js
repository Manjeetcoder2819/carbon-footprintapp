import React from 'react';
import './EmissionRating.css';

const EmissionRating = ({ grams }) => (
  <div className="rating-container">
    <h3>Carbon Emission Rating</h3>
    <p><strong>Rating:</strong> {grams <= 0.5 ? 'Low' : 'High'}</p>
  </div>
);

export default EmissionRating;