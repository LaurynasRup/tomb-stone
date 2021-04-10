const router = require('express').Router();
const productType = require('../model/ProductType');

// Get all types
router.get('/all_types', async (req, res) => {
	try {
		const allTypes = await productType.find();
		return res.status(200).json({
			...allTypes,
		});
	} catch (err) {
		return res.status(404).json({
			msg: 'No items found',
			err,
		});
	}
});

// Create a new type
router.post('/add_type', async (req, res) => {
	const newType = new productType({
		name: req.body.name,
		image: req.body.image,
		type_id: req.body.type_id,
	});
	try {
		const savedType = await newType.save();
		return res.status(200).send(savedType);
	} catch (err) {
		return res.status(400).json({
			msg: 'Could not add a new type',
			err,
		});
	}
});

// Delete a type
router.delete('/delete_type/:id', async (req, res) => {
	try {
		const deletedType = await productType.deleteOne({ _id: req.params.id });
		return res.status(200).json({ msg: 'Type deleted succesfully' });
	} catch (err) {
		return res.status(400).json({ msg: 'Unable to remove type' });
	}
});

module.exports = router;
