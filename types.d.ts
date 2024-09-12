import { ColumnMeta } from '@tanstack/react-table';
import { Session, DefaultUser } from 'next-auth';

declare module '@tanstack/react-table' {
	interface ColumnMeta {
		headerGroup?: {
			className?: string;
		};
		rows?: {
			className?: string;
			ellipsis?: 1 | 2 | 8;
			ellipsisClassName?: string;
		};
	}
}

declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
			role: 'user' | 'admin';
			permissions: Json;
		} & Session['user'];
	}

	interface User extends DefaultUser {
		id: string;
		role: 'user' | 'admin';
		permissions: Json;
	}
}
