import { ColumnDef } from '@tanstack/react-table';
import { TViews } from '@/service/views';

const columnsViews: ColumnDef<TViews>[] = [
	{
		accessorKey: 'view_id',
		header: 'ID',
	},
	{
		accessorKey: 'post_id',
		header: '게시물 ID',
	},
	{
		accessorKey: 'createdAt',
		header: '조회일시',
	},
	{
		accessorKey: 'duration',
		header: '조회기간(ms)',
	},
];

export default columnsViews;
