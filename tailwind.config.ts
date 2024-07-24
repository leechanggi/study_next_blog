import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'class',
	theme: {
		screens: {
			mobile: '426px',
			tablet: '769px',
			laptop: '1025px',
			desktop: '1281px',
		},
		extend: {
			backgroundColor: {
				oneLight: '#FAFAFA',
				oneDark: '#282C34',
			},
		},
	},

	plugins: [],
};
export default config;
