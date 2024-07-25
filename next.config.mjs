/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'picsum.photos',
			},
		],
	},
	async redirects() {
		return [
			{
				source: '/posts',
				destination: '/',
				permanent: false,
			},
		];
	},
	// async rewrites() {
	// 	return [
	// 		{
	// 			source: '/posts/:slug',
	// 			destination: '/posts/:slug',
	// 		},
	// 	];
	// },
};

export default nextConfig;
