import { useState } from 'react';

import { useRouter } from 'next/router';
import Modal from 'react-modal';

import Navbar from '@/components/navbar/Navbar';
import classes from './VideoDetail.module.css';
import { getVideo } from '@/lib/vodeos';

Modal.setAppElement('#__next');

export const getStaticProps = async (ctx) => {
	const { params } = ctx;
	const { videoId } = params;
	const video = await getVideo(videoId);
	return {
		props: {
			video,
			revalidate: 10,
		},
	};
};

export const getStaticPaths = () => {
	const videos = ['mYfJxlgR2jw', 'HxtLlByaYTc', '4zH5iYM4wJo'];
	return {
		paths: [
			{ params: { videoId: '4zH5iYM4wJo' } },
			{ params: { videoId: 'mYfJxlgR2jw' } },
			{ params: { videoId: 'HxtLlByaYTc' } },
		],
		fallback: 'blocking',
	};
};

const VideoDetailPage = ({ video }) => {
	const router = useRouter();
	const { videoId } = router.query;
	const { title, description, publishedTime, channelTitle, viewCount } =
		video;
	return (
		<div>
			<Navbar />
			<div className={classes.container}>
				<Modal
					isOpen={true}
					contentLabel="Watch the video"
					onRequestClose={() => router.back()}
					overlayClassName={classes.overlay}
					className={classes.modal}
				>
					<iframe
						width="100%"
						height="315"
						src={`https://www.youtube.com/embed/${videoId}`}
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen
						className={classes.videoPlayer}
					></iframe>
					<div className={classes.modalBody}>
						<div className={classes.modalBodyContent}>
							<div className={classes.col1}>
								<p className={classes.publishedTime}>
									{publishedTime}
								</p>
								<p className={classes.title}>{title}</p>
								<p className={classes.description}>
									{description}
								</p>
							</div>
							<div className={classes.col2}>
								<p className={classes.subText}>
									<span className={classes.textColor}>
										Cast:{' '}
									</span>
									<span className={classes.channelTitle}>
										{channelTitle}
									</span>
								</p>
								<p className={classes.subText}>
									<span className={classes.textColor}>
										View Count:{' '}
									</span>
									<span className={classes.channelTitle}>
										{viewCount}
									</span>
								</p>
							</div>
						</div>
					</div>
				</Modal>
			</div>
		</div>
	);
};

export default VideoDetailPage;
