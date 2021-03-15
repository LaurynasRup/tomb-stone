const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const port = 5000 || process.env.PORT;
const cors = require('cors');

//Routes
// User routes
const authRoute = require('./routes/auth');
// Product Routes
const productRoute = require('./routes/product');
// Decode token
const decodeRoute = require('./routes/decodeToken');

// DB Connect
const db = process.env.DB_CONNECT;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
	console.log('DB connected')
);

// Middleware
app.use(express.json());
app.use(cors());

//Route Middleware
app.use('/api/user', authRoute);
app.use('/api/products', productRoute);
app.use('/api/decode', decodeRoute);

app.listen(5000, () => console.log(`Server running on port ${port}`));
