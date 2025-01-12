const express = require('express');
const nodemailer = require('nodemailer');
const AuditResult = require('../models/AuditResult');

const router = express.Router();

// Email Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Route to save audit result and send email
router.post('/save', async (req, res) => {
  const { name, email, url, results, deviceName } = req.body;

  try {
    // Save result to MongoDB
    const newResult = new AuditResult({
      name,
      email,
      url,
      results,
      deviceName,
    });

    const savedResult = await newResult.save();

    // Generate Explanation based on CO2 emissions
    const explanation = generateExplanation(results.grams);

    // Email content
    const emailContent = `
      <h1>Website Carbon Footprint Analysis</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>URL:</strong> ${url}</p>
      <p><strong>Device:</strong> ${deviceName}</p>
      <p><strong>Page Size:</strong> ${results.MB} MB</p>
      <p><strong>Estimated CO2 Emissions:</strong> ${results.grams} g CO2</p>
      <p><strong>Explanation:</strong></p>
      <p>${explanation}</p>
      <br>
      <p>Thank you for visiting our website! 🌍</p>
    `;

    // Send email to user
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Website Carbon Footprint Analysis',
      html: emailContent,
    });

    // Respond with success message and explanation
    res.status(201).json({
      message: 'Data saved and email sent successfully',
      explanation,
      savedResult,
    });
  } catch (err) {
    console.error('Error occurred:', err.message);
    res.status(500).json({
      error: 'Failed to save data or send email',
      details: err.message,
    });
  }
});

// Function to generate explanation based on CO2 emissions
const generateExplanation = (co2Value) => {
  if (co2Value <= 0) {
    return 'This website has an extremely low carbon footprint.';
  } else if (co2Value <= 0.5) {
    return 'This website has a very low carbon footprint.';
  } else if (co2Value <= 1) {
    return "This website's carbon footprint is low. Consider optimization.";
  } else if (co2Value <= 2) {
    return 'This website has a moderate carbon footprint. Optimization is recommended.';
  } else {
    return 'This website has a high carbon footprint. Strong optimization is advised.';
  }
};

module.exports = router;
