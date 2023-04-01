/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**.ytimg.com',
			},
			{
				protocol: 'https',
				hostname: '**.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: '**.ggpht.com',
			},
		],
	},
};

module.exports = nextConfig;
