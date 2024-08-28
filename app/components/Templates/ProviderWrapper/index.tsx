'use client';

import React from 'react';

import { Footer, Header, Main } from '@/components';
import { ThemeProvider } from '@/lib';
import * as Types from './type';

const ProviderWrapper = (props: Types.ProviderWrapperProps) => {
	const { children } = props;
	return (
		<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
			<Header />
			<Main>{children}</Main>
			<Footer />
		</ThemeProvider>
	);
};

export default ProviderWrapper;
