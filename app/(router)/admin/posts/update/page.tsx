'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { cn, getPosts } from '@/lib';
import { TPosts } from '@/service/posts';
import { DataTable, Button } from '@/components';
import { getColumnsPostsByAccessorKeys } from '@/(router)/admin/posts/columns-posts';

const AdminPostsUpdatePage = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [posts, setPosts] = useState<TPosts[]>([]);
	const [rowSelection, setRowSelection] = useState<{ [key: string]: boolean }>(
		{}
	);
	const [postIdSelection, setPostIdSelection] = useState<number | null>(null);

	useEffect(() => {
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
	}, []);

	useEffect(() => {
		const selectedRowKey = Object.keys(rowSelection).find(
			key => rowSelection[key]
		);

		if (selectedRowKey !== undefined) {
			const selectedPostId = posts[parseInt(selectedRowKey)].post_id;
			setPostIdSelection(selectedPostId);
		} else {
			setPostIdSelection(null);
		}
	}, [posts, rowSelection]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	const columnsPosts = getColumnsPostsByAccessorKeys([
		'radioSelector',
		'post_id',
		'title',
		'createdAt',
		'updatedAt',
		'tags',
		'imgSrc',
		'skip',
	]);

	const isUpdateButtonDisabled = postIdSelection === null;

	return (
		<>
			<h2 className='text-xl font-medium mb-2'>게시물 수정</h2>
			<DataTable
				columns={columnsPosts}
				data={posts}
				options={{
					enableRowSelection: true,
					enableMultiRowSelection: false,
					state: {
						rowSelection,
					},
					onRowSelectionChange: setRowSelection,
				}}
			/>

			<Button
				size='lg'
				className={cn(
					'w-full',
					'mt-8',
					isUpdateButtonDisabled && 'cursor-not-allowed opacity-60'
				)}
				aria-disabled={isUpdateButtonDisabled}
				tabIndex={isUpdateButtonDisabled ? -1 : undefined}
				asChild
			>
				<Link
					href={
						isUpdateButtonDisabled
							? ''
							: `/admin/posts/update/${postIdSelection}`
					}
					passHref={isUpdateButtonDisabled}
				>
					게시물 수정
				</Link>
			</Button>
		</>
	);
};

export default AdminPostsUpdatePage;
