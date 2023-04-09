import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import { getToken } from 'next-auth/jwt';
import { getServerSession } from 'next-auth/next';
import { getSession } from 'next-auth/react';
import { options } from '../../auth/[...nextauth]';

import StatisticsModel from '@/lib/db/statistis.model';
import { dbConnect } from '@/lib/db';

const handler = async (req, res) => {
	switch (req.method) {
		case 'POST':
			const { videoId, watched, favourited } = req.body;
			try {
				await dbConnect();
				// const session = await getServerSession(req, res, options);
				const session = await getSession({ req });
				if (session) {
					// Signed in
					const { email } = session.user;
					const stats = await StatisticsModel.findOne({
						userId: email,
						videoId,
					});
					if (!stats) {
						const newStats = new StatisticsModel({
							userId: email,
							videoId,
							watched,
							favourited: null,
						});
						await newStats.save();
						return res.status(StatusCodes.OK).json({
							type: 'success',
							message: 'Stat created',
						});
					} else {
						await StatisticsModel.updateOne({
							userId: email,
							videoId: '4zH5iYM4wJo',
							$set: {
								watched,
								favourited,
							},
						});
						return res.status(StatusCodes.OK).json({
							type: 'success',
							message: 'update successful',
						});
					}
				} else {
					// Not Signed in
					return res
						.status(StatusCodes.FORBIDDEN)
						.json({ type: 'error', message: 'not logged in' });
				}
			} catch (error) {
				return res.status(StatusCodes.BAD_REQUEST).json({
					type: 'error',
					message: error.message || 'something went wrong!',
				});
			} finally {
				mongoose.connection.close();
			}
		case 'GET':
			const id = req.query.videoId;
			if (!id) {
				return res.status(StatusCodes.BAD_REQUEST).json({
					type: 'error',
					message: 'bad request, provide query parmas',
				});
			}
			try {
				await dbConnect();
				// const session = await getServerSession(req, res, options);
				const session = await getSession({ req });
				if (session) {
					// Signed in
					const { email } = session.user;
					const stats = await StatisticsModel.findOne({
						userId: email,
						videoId: id,
					});
					return res.status(StatusCodes.OK).json({
						type: 'success',
						stats,
					});
				}
			} catch (error) {
				return res.status(StatusCodes.BAD_REQUEST).json({
					type: 'error',
					message: error.message || 'could no retrieve stats',
				});
			} finally {
				mongoose.connection.close();
			}

		default:
			return res.status(StatusCodes.BAD_REQUEST).json({
				type: 'error',
				message: error.message || 'unsupported method',
			});
	}
};

export default handler;

// This is an example of how to read a JSON Web Token from an API route
