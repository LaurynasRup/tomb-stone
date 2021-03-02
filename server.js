// imports
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// Create app & configuration
const app = express();
app.use(express.json());

// Port
const PORT = 5000 || process.env.PORT;

// Connect to db

// Main endpoint
app.get('/', (req, res) => {
	res.send('This is the main endpoint');
});

// Listen for server
app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
