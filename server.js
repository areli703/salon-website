const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// API route
app.use('/api/generate', require('./api/generate'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
