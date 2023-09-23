import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide an Name!'],
		unique: false,
	},
	email: {
		type: String,
		required: [true, 'Please provide an Email!'],
		unique: [true, 'Email Exist'],
	},

	password: {
		type: String,
		required: [true, 'Please provide a password!'],
		unique: false,
	},
	highScore: {
		type: Number,
		default: 0,
	},
});

const UserModel = mongoose.model('user', UserSchema);

export default UserModel;
