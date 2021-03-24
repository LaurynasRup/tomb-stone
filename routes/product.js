const router = require('express').Router();
const { product } = require('../model/Product');
const { historical } = require('../model/Product');
const detailOrNull = require('../functions/product');
const verify = require('../routes/verifyToken');

// Get all products
router.get('/all_products', verify, async (req, res) => {
	try {
		const allItems = await product.find();
		return res.status(200).json({ ...allItems });
	} catch (err) {
		return res.status(404).json({ msg: 'No items found' });
	}
});

// Add new product
router.post('/add_product', verify, async (req, res) => {
	// Create new product
	const newProduct = new product({
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
		available: req.body.available,
	});
	try {
		const savedProduct = await newProduct.save();
		return res.status(201).send(savedProduct);
	} catch (err) {
		return res.status(400).json({ msg: 'Unable to add product' });
	}
});

// Delete product
router.delete('/delete_product/:id', verify, async (req, res) => {
	try {
		const removedProduct = await product.deleteOne({ _id: req.params.id });
		return res.status(200).send('Product has been removed');
	} catch (err) {
		return res.status(400).json({ msg: 'Unable to remove the product' });
	}
});

// Update product
router.patch('/update_product/:id', verify, async (req, res) => {
	const rBody = req.body;
	const nullItems = [];
	const updatedDetails = {
		product: {
			product_type: detailOrNull(rBody.product.product_type, nullItems),
			type_img: detailOrNull(rBody.product.type_img, nullItems),
		},
		product_img: rBody.product_img,
		warehouse_location: detailOrNull(rBody.warehouse_location, nullItems),
		dimensions: {
			short: detailOrNull(rBody.dimensions.dimensions_short, nullItems),
			long: detailOrNull(rBody.dimensions.dimensions_long, nullItems),
			width: detailOrNull(rBody.dimensions.dimensions_width, nullItems),
		},
		barcode: detailOrNull(rBody.barcode, nullItems),
		comments: rBody.comments,
		edited_by: detailOrNull(rBody.edited_by, nullItems),
		available: detailOrNull(rBody.available, nullItems),
	};
	if (nullItems.length === 0) {
		try {
			const updatedProduct = await product.updateOne(
				{ _id: req.params.id },
				{
					$set: updatedDetails,
				}
			);
			return res.status(200).send('Product has been updated succesfully');
		} catch (err) {
			return res.status(400).json({ msg: 'Cannot update product details' });
		}
	} else {
		return res.status(400).json({ msg: 'Please enter all details' });
	}
});

// Store product historically
router.post('/add_historical', verify, async (req, res) => {
	// Create new product
	const newProduct = new historical({
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
		available: req.body.available,
	});
	try {
		const savedProduct = await newProduct.save();
		return res.status(201).send(savedProduct);
	} catch (err) {
		return res.status(400).json({ msg: 'Cannot add historical product' });
	}
});

module.exports = router;
