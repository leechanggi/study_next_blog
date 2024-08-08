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
			mobile: '425px',
			tablet: '768px',
			laptop: '1024px',
			desktop: '1280px',
		},
		extend: {
			fontFamily: {
				pretendard: ['var(--font-pretendard)'],
			},
			spacing: {
				layoutHeight: 'calc(100vh - 10rem)',
				dialogFooterWidth: 'calc(100% + 3rem)',
			},
			backgroundColor: {
				oneLight: '#FAFAFA',
				oneDark: '#282C34',
			},
			keyframes: {
				slideIn: {
					'0%': { transform: 'translate(-50%, -60%)', opacity: '0' },
					'100%': { transform: 'translate(-50%, -50%)', opacity: '1' },
				},
				slideOut: {
					'0%': { transform: 'translate(-50%, -50%)', opacity: '1' },
					'100%': { transform: 'translate(-50%, -60%)', opacity: '0' },
				},
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				slideIn: 'slideIn 0.3s ease-out',
				slideOut: 'slideOut 0.3s ease-in',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
export default config;
