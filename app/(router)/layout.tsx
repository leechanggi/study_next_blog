import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { Footer, Header, Main } from '@components';
import { cn, ThemeProvider } from '@lib';

import './globals.css';

const metadata: Metadata = {
	title: 'LXYEX1379',
	description: '개인 블로그입니다.',
};

const fonts = localFont({
	src: '../../public/fonts/PretendardVariable.woff2',
	display: 'swap',
	weight: '45 920',
});

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<html lang='ko' suppressHydrationWarning>
			<body
				className={cn(
					'relative',
					'bg-white',
					'text-zinc-900',
					'border-zinc-200',
					'focus-visible:outline-none',
					'focus-visible:ring-2',
					'focus-visible:ring-zinc-200',
					'focus-visible:ring-offset-4',
					'dark:bg-zinc-900',
					'dark:text-white',
					'dark:border-zinc-700',
					'dark:focus-visible:ring-zinc-700',
					fonts.className
				)}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<Header />
					<Main>{children}</Main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
};

export { metadata };
export default RootLayout;
