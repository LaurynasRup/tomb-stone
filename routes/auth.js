const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('../routes/verifyToken');

// Create a user
router.post('/register', verify, async (req, res) => {
	// Check if username already exists
	const doesExist = await User.findOne({ username: req.body.username });
	if (doesExist) return res.status(400).json({ msg: 'User already exist' });

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
		return res
			.status(201)
			.json({ user: savedUser, msg: 'User added succesfully' });
	} catch (err) {
		return res.status(400).json({ msg: 'Can not add new user' });
	}
});

// Delete a user
router.delete('/delete/:id', verify, async (req, res) => {
	try {
		// remove user
		const removedUser = await User.deleteOne({ _id: req.params.id });
		return res.status(200).send('User removed succesfully');
	} catch (err) {
		return res.status(404).send('User not found');
	}
});

// Update a user
router.patch('/update/:id', verify, async (req, res) => {
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
			return res.status(200).send('User updated succesfully');
		} catch (err) {
			return res.send(404).send('User can not be updated');
		}
	} else {
		return res.status(400).send('User details required');
	}
});

// Login
router.post('/login', async (req, res) => {
	// Check if username  exists
	const user = await User.findOne({ username: req.body.username });
	if (!user)
		return res.status(400).json({
			msg: 'User does not exist',
		});

	// Is password correct
	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass) return res.status(400).json({ msg: 'Invalid password' });

	// Create a JWT token
	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
		expiresIn: '9h',
	});
	return res.header('auth-token', token).json({
		user,
		token,
	});
});

// Login with id
router.post('/login_id', async (req, res) => {
	// Check if username exists
	const user = await User.findOne({ _id: req.body.userId });
	if (!user)
		return res.status(400).json({
			msg: 'User does not exist',
		});
	return res.status(200).json({
		user,
	});
});

// Fetch all users
router.get('/all_users', async (req, res) => {
	try {
		const allUsers = await User.find().sort({ date: -1 });
		res.status(200).json({ ...allUsers });
	} catch (error) {
		return res.status(404).json({ msg: 'No users found', error });
	}
});

module.exports = router;
