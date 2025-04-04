const express = require("express");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static files

// Ensure uploads folder exists
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

// File upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

// Handle form submission
app.post("/submit-form", upload.single("fileUpload"), (req, res) => {
    const { companyName, projectName, gstNumber, serviceType } = req.body;
    const filePath = req.file ? req.file.path : "No file uploaded";

    // Save data to JSON file
    const formData = { companyName, projectName, gstNumber, serviceType, filePath };
    fs.appendFile("data.json", JSON.stringify(formData) + ",\n", (err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to save data" });
        }
        res.json({ message: "Form submitted successfully!", filePath });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
