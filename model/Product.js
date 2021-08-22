const mongoose = require('mongoose');

const productObj = {
	product: {
		product_type: {
			type: String,
			required: true,
		},
		type_img: {
			type: String,
			required: true,
		},
	},
	product_img: {
		type: String,
	},
	warehouse_location: {
		type: String,
		required: true,
	},
	dimensions: {
		short: {
			type: Number,
			required: true,
		},
		long: {
			type: Number,
			required: true,
		},
		width: {
			type: Number,
			required: true,
		},
	},
	barcode: {
		type: Number,
		required: true,
	},
	comments: {
		type: String,
	},
	edited_by: {
		type: String,
		required: true,
	},
	reserved: {
		isReserved: {
			type: Boolean,
			required: true,
		},
		id: {
			type: String,
		},
	},
	date: {
		type: Date,
		default: Date.now,
	},
	delete_reason: {
		type: String
	}
};

const productSchema = new mongoose.Schema(productObj, {
	collection: 'products',
});
const historicalSchema = new mongoose.Schema(productObj, {
	collection: 'historical',
});

module.exports = {
	product: mongoose.model('Product', productSchema),
	historical: mongoose.model('Historical', historicalSchema),
};
