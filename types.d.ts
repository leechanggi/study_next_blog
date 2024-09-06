import { ColumnMeta } from '@tanstack/react-table';

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
