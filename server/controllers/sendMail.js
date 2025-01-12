const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  try {
    // Assume these details are coming from the request body (you can adjust as needed)
    const { deviceName, fileSize, co2Emissions } = req.body; 

    // Create a test account to use with Ethereal SMTP service
    let testAccount = await nodemailer.createTestAccount();

    // Set up the transporter with SMTP settings
    let transporter = await nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "", // Replace with your Ethereal email account user
        pass: "SHARE_WITH_FRIENDS", // Replace with your Ethereal email account password
      },
    });

    // Create dynamic email content
    const emailContent = `
      <h1>Website Carbon Impact</h1>
      <p><strong>Device:</strong> ${deviceName}</p>
      <p><strong>File Size:</strong> ${fileSize} ${fileSize > 1 ? "GB" : "MB"}</p>
      <p><strong>CO2 Emissions:</strong> ${co2Emissions} grams</p>
      <p><strong>Explanation:</strong></p>
      <p>${generateExplanation(co2Emissions)}</p>
      <br>
      <p>Thank you for visiting our website! 🌍</p>
    `;

    // Send email
    let info = await transporter.sendMail({
      from: '"xyz" <xyz@gmail.com>', // sender address
      to: "iam@gmail.com", // list of receivers (replace with the actual recipient email)
      subject: "Website Carbon Footprint Details", // Subject line
      text: `Device: ${deviceName}, File Size: ${fileSize} MB/GB, CO2 Emissions: ${co2Emissions} grams`, // plain text body
      html: emailContent, // HTML formatted body
    });

    console.log("Message sent: %s", info.messageId);
    res.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Function to generate explanation based on CO2 emissions
const generateExplanation = (co2Value) => {
  if (co2Value <= 0) {
    return "This website has an extremely low carbon footprint.";
  } else if (co2Value <= 0.5) {
    return "This website has a very low carbon footprint.";
  } else if (co2Value <= 1) {
    return "This website's carbon footprint is low. Consider optimization.";
  } else if (co2Value <= 2) {
    return "This website has a moderate carbon footprint. Optimization is recommended.";
  } else {
    return "This website has a high carbon footprint. Strong optimization is advised.";
  }
};

module.exports = sendMail;
