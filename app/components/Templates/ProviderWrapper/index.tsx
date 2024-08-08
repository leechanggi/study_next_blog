'use client';

import React from 'react';
import { SessionProvider as AuthSessionProvider } from 'next-auth/react';

import { Footer, Header, Main } from '@components';
import { ThemeProvider } from '@lib';
import * as Types from './type';

const ProviderWrapper = (props: Types.ProviderWrapperProps) => {
	const { children } = props;
	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='system'
			enableSystem
			disableTransitionOnChange
		>
			<AuthSessionProvider>
				<Header />
				<Main>{children}</Main>
				<Footer />
			</AuthSessionProvider>
		</ThemeProvider>
	);
};

export default ProviderWrapper;
