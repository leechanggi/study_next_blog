'use client';

import React from 'react';

import { Footer, Header, Main } from '@/components';
import { ThemeProvider } from '@/lib';
import * as Types from './type';

const ProviderWrapper = (props: Types.ProviderWrapperProps) => {
	const { children } = props;
	return (
		<ThemeProvider attribute='class' defaultTheme='light' enableSystem={false}>
			<Header />
			<Main>{children}</Main>
			<Footer />
		</ThemeProvider>
	);
};

export default ProviderWrapper;
