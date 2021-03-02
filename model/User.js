const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			min: 6,
			max: 255,
		},
		username: {
			type: String,
			required: true,
			min: 6,
			max: 255,
		},
		password: {
			type: String,
			required: true,
			min: 6,
			max: 1024,
		},
		admin: {
			type: Boolean,
			default: false,
		},
		date: {
			type: Date,
			default: Date.now,
		},
	},
	{
		collection: 'users',
	}
);

module.exports = mongoose.model('User', userSchema);
