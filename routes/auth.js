const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');

// Create a user
router.post('/register', async (req, res) => {
	// Check if username already exists
	const doesExist = await User.findOne({ username: req.body.username });
	if (doesExist) return res.status(400).send('User already exist');

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

// Delete a user
router.delete('/delete/:id', async (req, res) => {
	try {
		// remove user
		const removedUser = await User.deleteOne({ _id: req.params.id });
		res.status(200).send('User removed succesfully');
	} catch (err) {
		res.status(404).send('User not found');
	}
});

// Update a user
router.patch('/update/:id', async (req, res) => {
	const salt = await bcrypt.genSalt(10);
	const hashedPass = await bcrypt.hash(req.body.password, salt);
	const updateDetails = {
		name: req.body.name,
		username: req.body.username,
		password: hashedPass,
		admin: req.body.admin,
	};
	if (
		updateDetails.name &&
		updateDetails.username &&
		updateDetails.password &&
		updateDetails.admin
	) {
		try {
			const updatedUser = await User.updateOne(
				{ _id: req.params.id },
				{
					$set: updateDetails,
				}
			);
			res.status(200).send('User updated succesfully');
		} catch (err) {
			res.send(404).send('User can not be updated');
		}
	} else {
		res.status(400).send('User details required');
	}
});

// Login

module.exports = router;
