const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
	const token = req.header('auth-token');
	if (!token) res.status(401).send('Access Denied');

	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		res.user = verified;
		next();
	} catch (err) {
		res.status(400).send('Invalid Token');
	}
};

module.exports = verify;
