import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import { signIn } from 'next-auth/react';

import { dbConnect } from '@/lib/db';

import UserModel from '@/lib/db/user.model';

export default async function register(req, res) {
	switch (req.method) {
		case 'POST':
			const email = req.body.email;
			const password = req.body.password;
			try {
				await dbConnect();
				const userExists = await UserModel.findOne({ email });
				if (userExists) {
					return res.status(StatusCodes.BAD_REQUEST).json({
						type: 'error',
						message: 'user already exists',
					});
				}
				const user = new UserModel({ email });
				const passwordHash = await user.hashPassword(password);
				user.password = passwordHash;
				await user.save();
				await signIn('credentials', {
					redirect: false,
					email: user.email,
					password: password,
				});
				return res.status(StatusCodes.CREATED).json({
					type: 'success',
					user: { id: user._id, email: user.email },
				});
			} catch (error) {
				return res.status(StatusCodes.BAD_REQUEST).json({
					type: 'error',
					message: error.message || 'something went wrong',
				});
			} finally {
				mongoose.connection.close();
			}
		default:
			return {
				type: 'error',
				error: 'unsupported methods',
			};
	}
}
