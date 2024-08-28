'use client';

import React from 'react';
import { SessionContext } from '@/lib';

const useSession = () => {
	const context = React.useContext(SessionContext);

	if (context === undefined) {
		throw new Error('useSession must be used within a SessionProvider');
	}

	return context;
};

export default useSession;
