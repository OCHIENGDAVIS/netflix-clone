import mongoose, { Schema } from 'mongoose';
import * as bcrypt from 'bcryptjs';

const UserSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true,
	},

	password: {
		type: String,
		required: true,
	},
});

UserSchema.methods.hashPassword = async function (password) {
	const salt = await bcrypt.genSalt(10);
	const passwordHash = await bcrypt.hash(password, salt);
	return passwordHash;
};

UserSchema.methods.comparePasswords = async function (userProvided, dbHash) {
	const isMatch = await bcrypt.compare(userProvided, dbHash);
	return isMatch;
};

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

export default UserModel;
