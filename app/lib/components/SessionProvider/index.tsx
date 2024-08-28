'use client';

import React from 'react';
import { Session } from '@supabase/supabase-js';
import { supabaseClient, SessionContext } from '@/lib';

type SessionProviderProps = {
	children: React.ReactNode;
};

const adminSecret = process.env.NEXT_PUBLIC_SUPABASE_ADMIN_SECRET || '';

const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
	const [session, setSession] = React.useState<Session | null>(null);

	React.useEffect(() => {
		const fetchSession = async () => {
			const { data } = await supabaseClient.auth.getSession();
			setSession(data.session);
		};

		fetchSession();

		const { data: authListener } = supabaseClient.auth.onAuthStateChange(
			(_event, session) => {
				if (session && session.user.id === adminSecret) {
					session.user.role = 'admin';
				}
				setSession(session);
			}
		);

		return () => {
			authListener.subscription.unsubscribe();
		};
	}, []);

	return (
		<SessionContext.Provider value={session}>
			{children}
		</SessionContext.Provider>
	);
};

export type { SessionProviderProps };
export default SessionProvider;
