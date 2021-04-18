const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const port = 5000 || process.env.PORT;
const cors = require('cors');

//Routes
// User Routes
const authRoute = require('./routes/auth');
// Product Routes
const productRoute = require('./routes/product');
// Product Type Routes
const productTypeRoute = require('./routes/productType');
// Decode Token
const decodeRoute = require('./routes/decodeToken');
// Upload Images Route
const uploadImgRoute = require('./routes/uploadImages');

// DB Connect
const db = process.env.DB_CONNECT;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
	console.log('DB connected')
);

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

//Route Middleware
app.use('/api/user', authRoute);
app.use('/api/products', productRoute);
app.use('/api/types', productTypeRoute);
app.use('/api/decode', decodeRoute);
app.use('/api/upload_images', uploadImgRoute);

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	// set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(port, () => console.log(`Server running on port ${port}`));
