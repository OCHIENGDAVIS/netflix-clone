import { Fragment } from 'react';
import { getServerSession } from 'next-auth/next';
import mongoose from 'mongoose';

import StatisticsModel from '@/lib/db/statistis.model';
import { options } from '../api/auth/[...nextauth]';
import { dbConnect } from '@/lib/db';
import rawVideos from '@/data/videos.json';

import Navbar from '@/components/navbar/Navbar';
import Card from '@/components/card/Card';
import classes from './Mylist.module.css';

export default function MyList({ videos }) {
	return (
		<Fragment>
			<Navbar />
			<div className={classes.mylist}>
				{videos &&
					videos.map((video) => {
						const imgUrl = video.snippet.thumbnails.high.url;
						const id = video.id.videoId;
						console.log({ id });
						const title = video.snippet.title;
						return (
							<Card
								id={id}
								title={title}
								imgUrl={imgUrl}
								size="medium"
							/>
						);
					})}
				{videos.length <= 0 && (
					<p>You have not liked or watched any video</p>
				)}
			</div>
		</Fragment>
	);
}

export async function getServerSideProps(ctx) {
	const { req, res } = ctx;
	const session = await getServerSession(req, res, options);
	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}
	const { email } = session.user;
	await dbConnect();
	const watchedVideos = await StatisticsModel.find({
		userId: email,
		watched: true,
	}).lean();
	const serializableVideos = watchedVideos.map((video) => {
		const { _id, ...rest } = video;
		return {
			...rest,
			_id: _id.toString(),
		};
	});

	let videos = [];
	serializableVideos.forEach(({ videoId }) => {
		for (let item of rawVideos.items) {
			if (item.id.videoId === videoId) {
				videos.push(item);
			}
		}
	});

	return {
		props: {
			videos,
		},
	};
}
