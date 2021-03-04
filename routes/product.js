const router = require('express').Router();
const Product = require('../model/Product');

// Add new product
router.post('/add_product', async (req, res) => {
	// Create new product
	const newProduct = new Product({
		product: {
			product_type: req.body.product.product_type,
			type_img: req.body.product.type_img,
		},
		product_img: req.body.product_img,
		warehouse_location: req.body.warehouse_location,
		dimensions: {
			short: req.body.dimensions.dimensions_short,
			long: req.body.dimensions.dimensions_long,
			width: req.body.dimensions.dimensions_width,
		},
		barcode: req.body.barcode,
		comments: req.body.comments,
		edited_by: req.body.edited_by,
	});
	try {
		const savedProduct = await newProduct.save();
		res.status(201).send(savedProduct);
	} catch (err) {
		res.status(400).send(err);
	}
});

// Delete product
router.delete('/delete_product/:id', async (req, res) => {
	try {
		const removedProduct = await Product.deleteOne({ _id: req.params.id });
		res.status(200).send('Product has been removed');
	} catch (err) {
		res.status(400).send('Unable to remove the product');
	}
});

// Update product
router.patch('/update_product/:id', async (req, res) => {
	const rBody = req.body;
	const nullItems = [];
	const updatedDetails = {
		product: {
			product_type: rBody.product.product_type
				? rBody.product.product_type
				: nullItems.push(null),
			type_img: rBody.product.type_img
				? rBody.product.type_img
				: nullItems.push(null),
		},
		product_img: rBody.product_img,
		warehouse_location: rBody.warehouse_location
			? rBody.warehouse_location
			: nullItems.push(null),
		dimensions: {
			short: rBody.dimensions.dimensions_short
				? rBody.dimensions.dimensions_short
				: nullItems.push(null),
			long: rBody.dimensions.dimensions_long
				? rBody.dimensions.dimensions_long
				: nullItems.push(null),
			width: rBody.dimensions.dimensions_width
				? rBody.dimensions.dimensions_width
				: nullItems.push(null),
		},
		barcode: rBody.barcode ? rBody.barcode : nullItems.push(null),
		comments: rBody.comments,
		edited_by: rBody.edited_by ? rBody.edited_by : nullItems.push(null),
	};
	if (nullItems.length === 0) {
		try {
			const updatedProduct = await Product.updateOne(
				{ _id: req.params.id },
				{
					$set: updatedDetails,
				}
			);
			res.status(200).send('Product has been updated succesfully');
		} catch (err) {
			res.status(400).send('Cannot update product details');
		}
	} else {
		res.status(400).send('Please enter all details');
	}
});
module.exports = router;
