import styles from './SectionCards.module.css';

import Card from '../card/Card';

const SectionCards = (props) => {
	const { title, videos } = props;
	return (
		<section className={styles.container}>
			<h2 className={styles.title}>{title}</h2>
			<div className={styles.cardWrapper}>
				{videos &&
					videos.map(({ id, title, imgUrl }) => (
						<Card
							id={id}
							title={title}
							size="large"
							imgUrl={imgUrl}
						/>
					))}
			</div>
		</section>
	);
};

export default SectionCards;
