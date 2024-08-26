import { ColumnDef, TableOptions } from '@tanstack/react-table';

type DataTableProps<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	options?: Partial<
		Omit<TableOptions<TData>, 'columns' | 'data' | 'getCoreRowModel'>
	>;
};

export type { DataTableProps };
