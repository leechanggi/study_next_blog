import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { ProviderWrapper } from '@/components';
import { cn } from '@/lib';

import './globals.css';

const metadata: Metadata = {
	title: {
		default: '이창기 개발 블로그',
		template: '이창기 개발 블로그 | %s',
	},
	description: '이창기 개발 블로그 입니다.',
	icons: {
		icon: '/favicon.ico',
	},
};

const pretendard = localFont({
	src: '../../public/fonts/PretendardVariable.woff2',
	display: 'swap',
	weight: '45 920',
	variable: '--font-pretendard',
});

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<html
			lang='ko'
			className='w-full overflow-x-hidden'
			suppressHydrationWarning
		>
			<body
				className={cn(
					'relative',
					'w-full',
					'bg-white',
					'text-zinc-900',
					'border-zinc-200',
					'overflow-x-hidden',
					'focus-visible:outline-none',
					'focus-visible:ring-2',
					'focus-visible:ring-zinc-200',
					'focus-visible:ring-offset-4',
					'dark:bg-zinc-900',
					'dark:text-white',
					'dark:border-zinc-700',
					'dark:focus-visible:ring-zinc-700',
					'font-pretendard',
					pretendard.variable
				)}
			>
				<ProviderWrapper>{children}</ProviderWrapper>
			</body>
		</html>
	);
};

export { metadata };
export default RootLayout;
