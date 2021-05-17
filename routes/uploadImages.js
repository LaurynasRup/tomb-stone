const router = require('express').Router();
const { cloudinary } = require('../cloudinary/cloudinary');

router.post('/', async (req, res) => {
	try {
		const fileStr = req.body.data;
		const preset = req.body.upload_preset;
		const uploadResponse = await cloudinary.uploader.upload(fileStr, {
			upload_preset: preset,
		});
		const adjustedImgUrl = uploadResponse.secure_url.replace(
			'upload/',
			'upload/q_auto:low/'
		);
		res.json({
			msg: 'Image uploaded succesfully',
			data: adjustedImgUrl,
		});
	} catch (error) {
		res.status(500).json({ msg: 'Failed to upload the image', error });
	}
});

module.exports = router;
