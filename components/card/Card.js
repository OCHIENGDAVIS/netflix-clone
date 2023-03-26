import { useState } from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';
import cls from 'classnames';

import styles from './Card.module.css';

const Card = (props) => {
	const { size, imgUrl, id } = props;
	const [imgSrc, setImgSrc] = useState(imgUrl);
	const classMap = {
		large: styles.lgItem,
		small: styles.smItem,
		medium: styles.mdItem,
	};
	const handleOnError = () => {
		setImgSrc('/static/clifford.webp');
	};
	const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };
	return (
		<div className={styles.container}>
			<motion.div
				className={cls(styles.imgMotionWrapper, classMap[size])}
				whileHover={{ ...scale, zIndex: 99 }}
			>
				<Image
					alt="image"
					src={imgSrc}
					fill
					onError={handleOnError}
					style={{
						objectFit: 'cover',
						borderRadius: '10px',
					}}
				/>
			</motion.div>
		</div>
	);
};

export default Card;