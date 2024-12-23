const axios = require('axios');

module.exports = async (req, res) => {
    if (req.method === 'GET') {
        const url = "https://fleet-api.cloudbrix.co/api/data/contact/get";
        try {
            const response = await axios.get(url);
            res.status(response.status).json(response.data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error forwarding request to backend API' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};
