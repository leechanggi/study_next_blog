import { Session, DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { ColumnMeta } from '@tanstack/react-table';
import { JsonValue } from '@prisma/client/runtime/library';

declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
			role: 'user' | 'admin';
			permissions: JsonValue;
		} & Session['user'];
	}

	interface User extends DefaultUser {
		id: string;
		role: 'user' | 'admin';
		permissions: JsonValue;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		id: string;
		role: 'user' | 'admin';
		permissions: JsonValue;
	}
}

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
