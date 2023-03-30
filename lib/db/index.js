import mongoose from 'mongoose';

export async function dbConnect() {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {});
		return conn;
	} catch (error) {
		console.log('could not connect to the database', error);
		throw new Error(error);
	}
}
