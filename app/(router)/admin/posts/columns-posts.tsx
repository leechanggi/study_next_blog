import { ColumnDef } from '@tanstack/react-table';
import { TPosts } from '@service/posts';

const columnsPosts: ColumnDef<TPosts>[] = [
	{
		accessorKey: 'post_id',
		header: 'post_id',
	},
	{
		accessorKey: 'title',
		header: 'title',
	},
	{
		accessorKey: 'description',
		header: 'description',
	},
	{
		accessorKey: 'content',
		header: 'content',
	},
	{
		accessorKey: 'createdAt',
		header: 'createdAt',
	},
	{
		accessorKey: 'updatedAt',
		header: 'updatedAt',
	},
	{
		accessorKey: 'tags',
		header: 'tags',
	},
	{
		accessorKey: 'imgSrc',
		header: 'imgSrc',
	},
	{
		accessorKey: 'skip',
		header: 'skip',
	},
];

export default columnsPosts;
