const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/send_email", (req, res) => {
    const { name, email, message } = req.body;

    // Create email transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "XXXXXXXXXX@gmail.com", // Change this to your email (Gmail)
            pass: "XXXXXXXXX" // Change this to your email password
        }
    });

    // Send email
    const mailOptions = {
        from: "XXXXXXX@gmail.com", // Change this to your email (Gmail)
        to: "XXXXXX@aol.com", // Change this to recipient's email (AOL)
        subject: "Feedback Form: New Message",
        text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
    };

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
