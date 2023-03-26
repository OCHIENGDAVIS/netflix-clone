import videosData from '@/data/videos.json';

// Authorization: Bearer[YOUR_ACCESS_TOKEN];
// Accept: application / json;
// API KEY is not working properly

const YOUTUBE_URL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=disney&key=${process.env.YOUTUBE_API_KEY}`;

export const getVideos = async () => {
	try {
		const res = await fetch(YOUTUBE_URL);
		const videosData = await res.json();
		if (videosData.error) {
			console.log('youtube API ERROR!', videosData.error);
			return [];
		}
		return videosData.items?.map((video) => {
			return {
				title: video.snippet.title,
				imgUrl: video.snippet.thumbnails.high.url,
				id: video?.id?.videoId,
			};
		});
	} catch (error) {
		console.log(error);
		return [];
	}
};
