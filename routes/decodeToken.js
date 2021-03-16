const jwt = require('jsonwebtoken');
const router = require('express').Router();

router.get('/decode_token', (req, res) => {
	const token = req.header('auth-token');
	try {
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
		return res.status(200).json({
			tokenId: decoded,
		});
	} catch (err) {
		return res.status(400).send('Could not proccess');
	}
});

module.exports = router;
