import videosData from '@/data/videos.json';

// Authorization: Bearer[YOUR_ACCESS_TOKEN];
// Accept: application / json;
// API KEY is not working properly

export const getVideos = async (query) => {
	const YOUTUBE_URL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${process.env.YOUTUBE_API_KEY}`;
	try {
		const res = await fetch(YOUTUBE_URL);
		const videosData = await res.json();
		if (videosData.error) {
			console.log('youtube API ERROR!', videosData.error);
			return [];
		}
		const cleanedData = videosData.items?.map((video) => {
			return {
				title: video.snippet.title,
				imgUrl: video.snippet.thumbnails.high.url,
				id: video?.id?.videoId || '4zH5iYM4wJo',
			};
		});

		return cleanedData;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const getVideo = async (id) => {
	const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${process.env.YOUTUBE_API_KEY}`;

	try {
		const res = await fetch(url);
		const videoData = await res.json();
		const video = videoData.items[0];
		return {
			title: video.snippet.title,
			imgUrl: video.snippet.thumbnails.high.url,
			id: video?.id?.videoId || '4zH5iYM4wJo',
			description: video.snippet.description,
			channelTitle: video.snippet.channelTitle,
			viewCount: video.statistics.viewCount,
			publishedTime: video.snippet.publishedAt,
		};
	} catch (error) {
		console.log(error);
		return null;
	}
};
