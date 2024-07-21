import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Header, Main } from '@components';
import { cn, ThemeProvider } from '@lib';

import './globals.css';

const metadata: Metadata = {
	title: "Lee's Convenience",
	description: '잡다한 블로그입니다.',
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
					'dark:bg-neutral-900',
					'dark:text-white',
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
