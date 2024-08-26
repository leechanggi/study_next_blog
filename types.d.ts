import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { IMarkdownEditor } from '@uiw/react-markdown-editor';
import { ColumnMeta, ColumnDef } from '@tanstack/react-table';

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
