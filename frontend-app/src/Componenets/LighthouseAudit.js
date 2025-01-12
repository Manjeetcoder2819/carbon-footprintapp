import React, { useState } from 'react';
import './LighthouseAudit.css';
import EmissionRating from './EmissionRating'; // Import the new component
import SemicircleEmissionBar from './SemicircleEmissionBar';
import ErrorPopup from './ErrorPopups'; // Import ErrorPopup component

const LighthouseAudit = () => {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [strategy, setStrategy] = useState('desktop');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Convert bytes to MB
  const convertBytesToMB = (bytes) => (bytes / (1024 * 1024)).toFixed(2);

  // Calculate Carbon Footprint
  const calculateCarbonFootprint = (sizeInMB) => {
    const carbonPerMB = 0.6 / 1.8; // CO₂ per MB based on 1.8 MB producing 0.6 grams of CO₂
    return (sizeInMB * carbonPerMB).toFixed(2); // Calculate and return CO₂ emissions
  };

  // URL Validation Function
  const validateURL = (url) => {
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/.*)?$/i;
    if (!url.trim() || !urlPattern.test(url)) {
      setError('Invalid URL. Please enter a valid URL (e.g., https://example.com).');
      return false;
    }
    setError(null); // Clear previous errors if URL is valid
    return true;
  };

  // Email Validation Function
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim() || !emailPattern.test(email)) {
      setError('Invalid email. Please enter a valid email (e.g., example@gmail.com).');
      return false;
    }
    setError(null); // Clear previous errors if email is valid
    return true;
  };

  // Form Validation
  const validateForm = () => {
    if (!validateURL(url) || !validateEmail(email)) {
      return false;
    }
    if (!name.trim() || name.length < 1) {
      setError('Name must be at least 1 character long.');
      return false;
    }
    setError(null); // Clear errors if everything is valid
    return true;
  };

  // Fetch Audit Data from Google API
  const fetchAuditData = async () => {
    const apiKey = 'AIzaSyDE2uQD9el6VVvh_rNyEr8erL5cdv6Tavw';
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      url
    )}&strategy=${strategy}&key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Failed to fetch audit data');
      const data = await response.json();

      console.log(data.lighthouseResult.audits); // Log all audit results to debug

      const byteWeight = data.lighthouseResult.audits['total-byte-weight']?.numericValue;
      if (!byteWeight) throw new Error('Total byte weight not found in API response.');

      const sizeInMB = convertBytesToMB(byteWeight);
      const carbonFootprint = calculateCarbonFootprint(sizeInMB);

      return { device: strategy, MB: sizeInMB, grams: carbonFootprint };
    } catch (error) {
      console.error('Error fetching audit data:', error);
      throw error;
    }
  };

  // Fetch the data based on user inputs
  const fetchData = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const auditData = await fetchAuditData();
      setResults(auditData);

      const response = await fetch('http://localhost:5000/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          url,
          results: {
            MB: auditData.MB, // Page size in MB
            grams: auditData.grams, // Carbon footprint in grams
          },
          deviceName: auditData.device, // Device type (desktop or mobile)
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error('Failed to save data');
      }

      console.log(data); // Handle the response data from the backend
    } catch (err) {
      setError(err.message);
      console.error('Error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Website Carbon Footprint Calculator</h2>

      {/* URL Input */}
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
      />

      {/* Name Input */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
      />

      {/* Email Input */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your Email"
      />

      {/* Device Strategy Selection */}
      <select value={strategy} onChange={(e) => setStrategy(e.target.value)}>
        <option value="desktop">Desktop</option>
        <option value="mobile">Mobile</option>
      </select>


      {/* Analyze Button */}
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>

      {/* Error Message */}
      {error && <ErrorPopup message={error} position="20px" />}

      {/* Display Results */}
      {results && (
        <div>
          <p>Device: {results.device}</p>
          <p>Page Size: {results.MB} MB</p>
          <p>CO₂ Emissions: {results.grams} g</p>

          <div>
            {/* Emission Rating */}
            <EmissionRating grams={parseFloat(results.grams)} />
          </div>

          <div>
            {/* Semicircle Emission Bar */}
            <SemicircleEmissionBar emissionValue={parseFloat(results.grams)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LighthouseAudit;
