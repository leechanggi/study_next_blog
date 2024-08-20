import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { IMarkdownEditor } from '@uiw/react-markdown-editor';

declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
			role: 'user' | 'admin';
		} & Session['user'];
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		id: string;
		role: 'user' | 'admin';
	}
}
