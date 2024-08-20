import removeImports from 'next-remove-imports';

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
};

export default removeImports()(nextConfig);
