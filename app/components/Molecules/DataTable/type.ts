import { ColumnDef } from '@tanstack/react-table';

type DataTableProps<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
};

export type { DataTableProps };
