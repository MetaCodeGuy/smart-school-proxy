const axios = require('axios');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { latitude, longitude, id } = req.body;

        const backendApiUrl = `https://fleet-api.cloudbrix.co/api/data/contact/update/${id}`;
        try {
            const response = await axios.put(backendApiUrl, {
                latitude: latitude,
                longitude: longitude,
            });
            res.status(response.status).json(response.data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error forwarding request to backend API' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};
