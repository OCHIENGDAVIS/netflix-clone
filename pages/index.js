import Head from 'next/head';

import Banner from '@/components/banner/Banner';
import Navbar from '@/components/navbar/Navbar';
import Card from '@/components/card/Card';
import SectionCards from '@/components/section-cards/SectionCards';

import { getVideos } from '@/lib/vodeos';

import styles from '@/styles/Home.module.css';

export default function Home({ disneyVideos, travelVideos, popularVideos }) {
	return (
		<>
			<Head>
				<title>Netflix Clone</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			<main>
				<Navbar username="Davis Ochieng" />
				<Banner
					title="Margin"
					subTitle="Business"
					imgUrl="/static/clifford.webp"
					videoId="4zH5iYM4wJo"
				/>
				<div className={styles.sectionWrapper}>
					<SectionCards title="Disney" videos={disneyVideos} />
				</div>
				<div className={styles.sectionWrapper}>
					<SectionCards title="Travel" videos={travelVideos} />
				</div>
				<div className={styles.sectionWrapper}>
					<SectionCards
						title="Popular Videos"
						videos={popularVideos}
					/>
				</div>
			</main>
		</>
	);
}

export async function getServerSideProps() {
	const disneyVideos = await getVideos('disney');
	const travelVideos = await getVideos('travel');
	const popularVideos = await getVideos('popular movies');

	return {
		props: {
			disneyVideos,
			travelVideos,
			popularVideos,
		},
	};
}
