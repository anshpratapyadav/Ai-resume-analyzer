
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Directory to store uploaded files

const AZURE_ENDPOINT = 'https://<your-azure-endpoint>/analyze'; // Replace with your Azure endpoint
const AZURE_API_KEY = '<your-api-key>'; // Replace with your Azure API key

app.use(express.json());

// Endpoint to analyze resumes
app.post('/analyze', upload.array('resumes'), async (req, res) => {
    try {
        const jobTitle = req.body.jobTitle;
        const requiredSkills = req.body.requiredSkills;
        
        // Process each uploaded file
        const analysisResults = await Promise.all(req.files.map(async (file) => {
            const filePath = path.join(__dirname, file.path);
            const fileContent = fs.readFileSync(filePath, 'utf-8'); // Read file content

            // Call Azure Cognitive Services for analysis
            const response = await axios.post(AZURE_ENDPOINT, {
                text: fileContent,
                jobTitle: jobTitle,
                requiredSkills: requiredSkills
            }, {
                headers: {
                    'Ocp-Apim-Subscription-Key': AZURE_API_KEY,
                    'Content-Type': 'application/json'
                }
            });

            // Process the response and return relevant data
            return {
                name: file.originalname,
                email: 'example@example.com', // Placeholder, extract from resume if possible
                skillsMatch: response.data.skillsMatch,
                experience: response.data.experience,
                education: response.data.education,
                status: response.data.status,
                score: response.data.score
            };
        }));

        // Send analysis results back to the client
        res.json(analysisResults);
    } catch (error) {
        console.error('Error analyzing resumes:', error);
        res.status(500).send('Error analyzing resumes');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
