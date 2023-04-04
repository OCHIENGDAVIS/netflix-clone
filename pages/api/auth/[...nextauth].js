import NextAuth from 'next-auth/next';
import credentialsProvider from 'next-auth/providers/credentials';
import mongoose from 'mongoose';

import UserModel from '@/lib/db/user.model';
import { dbConnect } from '@/lib/db';
// import callbacks from './callbacks';

const options = {
	// ensures that the JWT token is created and stored for you
	session: {
		jwt: true,
	},
	callbacks: {
		async session({ session, token, user }) {
			console.log({ session, user, token });
			session.user.id = token.id;
			return session;
		},
	},
	providers: [
		credentialsProvider({
			// ! called when next auth receives an in coming login request
			async authorize({ email, password }) {
				try {
					await dbConnect();
					const user = await UserModel.findOne({ email });
					if (!user) {
						// Throwing an error here allows next-auth the redirect to  different page (You can override to stay oin login page and display the error message using react )
						throw new Error('user not found');
					}
					const isMatch = await user.comparePasswords(
						password,
						user.password
					);
					if (!isMatch) {
						throw new Error('Credentials do not match');
					}
					// return an object here tells next-auth that user verification was successfull

					// return { email: user.email, id: user.id };
					return { email: user.email, id: user.id };
				} catch (error) {
				} finally {
					mongoose.connection.close();
				}
			},
		}),
	],
};

export default NextAuth(options);
