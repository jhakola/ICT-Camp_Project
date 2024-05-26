// JavaScript file (app.js)

// Load required modules
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

// Create an Express application
const app = express();

// Use body-parser for handling form data
app.use(bodyParser.urlencoded({ extended: true }));
// Set up static file middleware
app.use(express.static("public"));

// Define a route for handling POST requests to process form data
app.post("/send_email", (req, res) => {
    const { name, email, message } = req.body; // Extract form data

    // Create email transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL, // User email
            pass: process.env.EMAIL_PASSWORD // Email password
        }
    });

    // Define email options
    const mailOptions = {
        from: process.env.EMAIL, // Sender's email address
        to: process.env.RECIPIENT_EMAIL, // Recipient's email address
        subject: "Feedback Form: New Message", // Email subject
        text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}` // Email content
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error:", error);
            res.status(500).send("Message sending failed!");
        } else {
            console.log("Message sent:", info.response);
            res.status(200).send("Message sent successfully!");
        }
    });
});

// Define the server listening port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
