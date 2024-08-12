import { ColumnDef } from '@tanstack/react-table';
import { TPosts } from '@service/posts';

const columnsPosts: ColumnDef<TPosts>[] = [
	{
		accessorKey: 'post_id',
		header: 'ID',
	},
	{
		accessorKey: 'title',
		header: '제목',
	},
	// {
	// 	accessorKey: 'description',
	// 	header: 'description',
	// },
	// {
	// 	accessorKey: 'content',
	// 	header: 'content',
	// },
	{
		accessorKey: 'createdAt',
		header: '생성일시',
	},
	{
		accessorKey: 'updatedAt',
		header: '수정일시',
	},
	{
		accessorKey: 'tags',
		header: '태그',
	},
	// {
	// 	accessorKey: 'imgSrc',
	// 	header: 'imgSrc',
	// },
	{
		accessorKey: 'skip',
		header: '숨김',
	},
];

export default columnsPosts;
