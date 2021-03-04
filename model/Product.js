const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
	{
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
	},
	{
		collection: 'products',
	}
);

module.exports = mongoose.model('Product', productSchema);
