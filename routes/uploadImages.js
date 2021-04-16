const router = require('express').Router();
const { cloudinary } = require('../cloudinary/cloudinary');

router.post('/', async (req, res) => {
	try {
		const fileStr = req.body.data;
		const preset = req.body.upload_preset;
		const uploadResponse = await cloudinary.uploader.upload(fileStr, {
			upload_preset: preset,
		});
		res.json({ msg: 'Image uploaded succesfully', data: uploadResponse.url });
	} catch (error) {
		res.status(500).json({ msg: 'Failed to upload the image', error });
	}
});

module.exports = router;
