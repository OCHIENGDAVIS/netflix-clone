import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import Modal from 'react-modal';
import { useSession, getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import Like from '@/components/like/LikeIcon';
import DisLike from '@/components/dislike-icon/DislikeIcon';

import Navbar from '@/components/navbar/Navbar';
import classes from './VideoDetail.module.css';
import { getVideo } from '@/lib/vodeos';
import video from '@/data/video.json';
import { startExecuteInsertStats } from '@/lib/db/hasura';

Modal.setAppElement('#__next');

export const getStaticProps = async (ctx) => {
	const { params } = ctx;
	const { videoId } = params;
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
	const { data: session } = useSession();

	const { videoId } = router.query;
	const { title, description, publishedTime, channelTitle, viewCount } =
		video;
	const [toggleLike, setToggleLike] = useState(false);
	const [toggleDislike, setToggleDislike] = useState(false);
	useEffect(() => {
		const getStats = async () => {
			const res = await fetch(`/api/v1/stats?videoId=${videoId}`);
			const data = await res.json();
			const { stats } = data;
			console.log({ favourited });
			if (favourited === 1) {
				setToggleLike(true);
			} else if (favourited === 0) {
				setToggleDislike(true);
			}
		};
		getStats();
	}, [videoId]);

	const handleToggleDislike = async () => {
		setToggleDislike(!toggleDislike);
		setToggleLike(toggleDislike);
		const res = await fetch('/api/v1/stats', {
			method: 'POST',
			body: JSON.stringify({
				videoId,
				watched: true,
				favourited: toggleDislike ? 1 : 0,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await res.json();
		console.log(data);
	};
	const handleToggleLike = async () => {
		setToggleLike(!toggleLike);
		setToggleDislike(toggleLike);
		const res = await fetch('/api/v1/stats', {
			method: 'POST',
			body: JSON.stringify({
				videoId,
				watched: true,
				favourited: setToggleLike ? 1 : 0,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await res.json();
		console.log(data);
	};

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
					<div className={classes.likeDislikeBtnWrapper}>
						<div className={classes.likeBtnWrapper}>
							<button>
								<div
									className={classes.btnWrapper}
									onClick={handleToggleLike}
								>
									<Like selected={toggleLike} />
								</div>
							</button>
						</div>
						<button>
							<div
								className={classes.btnWrapper}
								onClick={handleToggleDislike}
							>
								<DisLike selected={toggleDislike} />
							</div>
						</button>
					</div>

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
