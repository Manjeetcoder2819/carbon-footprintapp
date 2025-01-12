const mongoose = require('mongoose');

// Define the schema for Audit Results
const auditResultSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  url: { type: String, required: true },
  results: {
    MB: { type: Number, required: true },
    grams: { type: Number, required: true },
  },
  deviceName: { type: String, required: true },
});

const AuditResult = mongoose.model('AuditResult', auditResultSchema);

module.exports = AuditResult;
