const mongoose = require('mongoose');

const productTypeSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		type_id: {
			type: String,
			required: true,
		},
	},
	{
		collection: 'product_types',
	}
);

module.exports = mongoose.model('productType', productTypeSchema);
