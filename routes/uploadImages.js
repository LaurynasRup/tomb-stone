const router = require('express').Router();
const { cloudinary } = require('../cloudinary/cloudinary');

router.post('/', async (req, res) => {
	try {
		const fileStr = req.body.data;
		const uploadResponse = await cloudinary.uploader.upload(fileStr, {
			upload_preset: 'product_images',
		});
		console.log(uploadResponse);
		res.json({ msg: 'Image uploaded succesfully', data: uploadResponse.url });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'Failed to upload the image', error });
	}
});

module.exports = router;
