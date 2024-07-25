import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { Header, Main } from '@components';
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
					'text-neutral-900',
					'border-neutral-200',
					'dark:bg-neutral-900',
					'dark:text-white',
					'dark:border-neutral-700',
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
				</ThemeProvider>
			</body>
		</html>
	);
};

export { metadata };
export default RootLayout;
