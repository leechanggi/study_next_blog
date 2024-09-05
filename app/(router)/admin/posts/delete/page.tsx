'use client';

import React from 'react';

import { cn, getPosts, deletePostById } from '@/lib';
import { TPosts } from '@/service/post';
import { DataTable, Button } from '@/components';
import { getColumnsPostsByAccessorKeys } from '@/(router)/admin/posts/columns-posts';

const AdminPostsDeletePage = () => {
	const [reload, setReload] = React.useState(false);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);
	const [posts, setPosts] = React.useState<TPosts[]>([]);
	const [rowSelection, setRowSelection] = React.useState<
		Record<string, boolean>
	>({});
	const [idSelection, setIdSelection] = React.useState<number | null>(null);

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedPosts = await getPosts(true);
				setPosts(fetchedPosts);
			} catch (err) {
				setError('일시적인 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [reload]);

	React.useEffect(() => {
		const selectedRowKey = Object.keys(rowSelection).find(
			key => rowSelection[key]
		);

		const selection =
			selectedRowKey && posts[parseInt(selectedRowKey)]?.id
				? posts[parseInt(selectedRowKey)].id
				: null;

		setIdSelection(selection);
	}, [posts, rowSelection]);

	const handleDelete = async () => {
		if (!idSelection) return;

		try {
			await deletePostById(idSelection);
			setReload(prev => !prev);
		} catch (error) {
			console.error('Error deleting post:', error);
			alert('게시물 삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
		}
	};

	const handleClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();
		handleDelete();
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	const columnsPosts = getColumnsPostsByAccessorKeys([
		'radioSelector',
		'id',
		'title',
		'createdAt',
		'updatedAt',
		'tags',
		'imgSrc',
		'skip',
	]);

	const isDeleteButtonDisabled = idSelection === null;

	return (
		<>
			<h2 className='text-xl font-medium mb-2'>게시물 삭제</h2>
			<DataTable
				columns={columnsPosts}
				data={posts}
				options={{
					enableRowSelection: true,
					enableMultiRowSelection: false,
					state: { rowSelection },
					onRowSelectionChange: setRowSelection,
				}}
			/>
			<Button
				size='lg'
				className={cn(
					'w-full',
					'mt-8',
					isDeleteButtonDisabled && 'cursor-not-allowed opacity-60'
				)}
				disabled={isDeleteButtonDisabled}
				tabIndex={isDeleteButtonDisabled ? -1 : undefined}
				onClick={handleClick}
			>
				게시물 삭제
			</Button>
		</>
	);
};

export default AdminPostsDeletePage;
