import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';
import cls from 'classnames';

import styles from './Card.module.css';

const Card = ({ id, title, imgUrl, size }) => {
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
		<Link href={`/video/${id}`}>
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
		</Link>
	);
};

export default Card;
