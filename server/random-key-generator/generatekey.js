// Import the crypto module from Node.js
const crypto = require('crypto');

// Function to generate a random key
const generateRandomKey = (length = 64) => {
  // Generate random bytes and convert them to a hexadecimal string
  return crypto.randomBytes(length).toString('hex');
};

// Generate a 64-byte key (you can change the length as needed)
const secretKey = generateRandomKey(64);  // 64 bytes = 128 characters in hexadecimal

// Output the generated key
console.log("Generated Secret Key: ", secretKey);
