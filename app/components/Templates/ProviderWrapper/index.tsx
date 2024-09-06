'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';

import { Footer, Header, Main } from '@/components';
import { ThemeProvider } from '@/lib';
import * as Types from './type';

const ProviderWrapper = (props: Types.ProviderWrapperProps) => {
	const { children } = props;
	return (
		<SessionProvider>
			<ThemeProvider
				attribute='class'
				defaultTheme='light'
				enableSystem={false}
			>
				<Header />
				<Main>{children}</Main>
				<Footer />
			</ThemeProvider>
		</SessionProvider>
	);
};

export default ProviderWrapper;
