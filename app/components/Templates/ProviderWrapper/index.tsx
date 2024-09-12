'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';

import store from '@store/index';
import { ThemeProvider } from '@/lib';
import { Footer, Header, Main } from '@/components';

import * as Types from './type';

const ProviderWrapper = (props: Types.ProviderWrapperProps) => {
	const { children } = props;
	return (
		<Provider store={store}>
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
		</Provider>
	);
};

export default ProviderWrapper;
