require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const AuditResult = require('./models/AuditResult');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Error connecting to MongoDB', err));

// Create API endpoint for saving data
app.post('/api/save', async (req, res) => {
  // Handle data saving logic here (same as the /api/save.js function)
});

// Start the server locally (for local testing)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
