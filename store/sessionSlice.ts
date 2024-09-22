import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SessionState = {
	user: {
		id: string | null;
		email: string | null;
		role: 'user' | 'admin' | null;
		permissions: JSON | null;
	} | null;
	expires: string | null;
};

const initialState: SessionState = {
	user: null,
	expires: null,
};

export const sessionSlice = createSlice({
	name: 'session',
	initialState,
	reducers: {
		setSession: (state, action: PayloadAction<SessionState>) => {
			state.user = action.payload.user;
			state.expires = action.payload.expires;
		},
		clearSession: state => {
			state.user = null;
			state.expires = null;
		},
	},
});

export const { setSession, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;
