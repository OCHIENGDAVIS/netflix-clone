import Image from 'next/image';

import classes from './Banner.module.css';

const Banner = (props) => {
	const { title, subTitle, imgUrl } = props;
	const handlePlay = () => {
		console.log('handle play');
	};
	return (
		<div className={classes.container}>
			<div className={classes.leftWrapper}>
				<div className={classes.left}>
					<div className={classes.nseriesWrapper}>
						<p className={classes.firstLetter}> N</p>
						<p className={classes.series}> S E R I E S</p>
					</div>
					<h1 className={classes.title}>{title}</h1>
					<h1 className={classes.sunTitle}>{subTitle}</h1>
					<div className={classes.playBtnWrapper}>
						<button
							className={classes.btnWithIcon}
							onClick={handlePlay}
						>
							<Image
								src="/static/play_arrow.svg"
								alt="play icon"
								width={32}
								height={32}
							/>
							<span className={classes.playText}>Play</span>
						</button>
					</div>
				</div>
			</div>
			<div
				className={classes.bannerImg}
				style={{
					backgroundImage: `url(${imgUrl})`,
					// width: '100%',
					// height: '100%',
					// backgroundPosition: '50% 50%',
					// backgroundSize: 'cover',
					// position: 'absolute',
				}}
			></div>
		</div>
	);
};

export default Banner;
