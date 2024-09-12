'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSession, clearSession } from '@store/sessionSlice';

const useSessionSync = () => {
	const { data: session } = useSession();
	const dispatch = useDispatch();

	useEffect(() => {
		if (session) {
			dispatch(
				setSession({
					user: session.user,
					expires: session.expires,
				})
			);
		} else {
			dispatch(clearSession());
		}

		console.log(session);
	}, [session, dispatch]);

	return session;
};

export default useSessionSync;
