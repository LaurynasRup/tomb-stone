const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
	// Hash Password
	const salt = await bcrypt.genSalt(10);
	const hashedPass = await bcrypt.hash(req.body.password, salt);

	// Create user to store in db
	const user = new User({
		name: req.body.name,
		username: req.body.username,
		password: hashedPass,
		admin: req.body.admin,
	});
	try {
		const savedUser = await user.save();
		res.send(savedUser);
	} catch (err) {
		res.status(400).send(err);
	}
});

module.exports = router;
