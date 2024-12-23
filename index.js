const express = require('express');
const axios = require('axios');
const cors = require('cors');

// Initialize the Express server
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());  // To parse incoming JSON bodies

// Endpoint to handle GET requests
app.get('/', async (req, res) => {
    const url = "https://fleet-api.cloudbrix.co/api/data/contact/get";
    try {
        const response = await axios.get(url);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error forwarding request to backend API' });
    }
});

// Endpoint to handle POST requests from SIM800L
app.post('/api/data/contact/update', async (req, res) => {
    const { latitude, longitude, id } = req.body;

    // Your backend API URL
    const backendApiUrl = `https://fleet-api.cloudbrix.co/api/data/contact/update/${id}`;
    console.log('Request received:', { latitude, longitude, id });

    try {
        // Forward the request to your backend API
        const response = await axios.put(backendApiUrl, {
            latitude: latitude,
            longitude: longitude,
        });

        // Send the response back to the SIM800L
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error forwarding request:', error.message);
        res.status(500).json({ message: 'Error forwarding request to backend API' });
    }
});

// Start the proxy server
app.listen(port, () => {
    console.log(`Proxy server running on http://localhost:${port}`);
});
