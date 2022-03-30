const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const port = process.env.PORT || 5555;
const cors = require('cors');
const path = require('path');

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
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {

	if(err) {
		console.log(err);
	} else {
		console.log('DB connected');
	}
}
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

// Redirect to https in production
app.use((req, res, next) => {
	if (process.env.NODE_ENV === 'production') {
		if (req.header('x-forwarded-proto') !== 'https') {
			res.redirect(`https://${req.header('host')}${req.url}`);
		} else {
			next();
		}
	}
});

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	// set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(port, () => console.log(`Server running on port ${port}`));
