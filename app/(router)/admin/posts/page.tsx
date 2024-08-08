'use client';

import React from 'react';
import axios from 'axios';
import { ColumnDef } from '@tanstack/react-table';

import { DataTable } from '@components';
import { TPosts } from '@service/posts';

import columnsPosts from './columns-posts';

const revalidate = 86400;
const apiUrl = process.env.NEXT_PUBLIC_API_HOST || '';

const AdminPosts = () => {
	const [posts, setPosts] = React.useState<TPosts[] | null>(null);

	React.useEffect(() => {
		const fetchPosts = async () => {
			const url = `${apiUrl}/api/posts`;
			const headers = {
				'Cache-Control': `max-age=${revalidate}, stale-while-revalidate=604800`,
			};

			try {
				const response = await axios.get(url, { headers });
				setPosts(response.data.data);
			} catch (error) {
				console.error('Failed to fetch posts:', error);
				throw new Error(
					'일시적인 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.'
				);
			}
		};

		fetchPosts();
	}, []);

	return (
		<>
			<h2 className='text-xl font-medium mb-2'>게시물 목록</h2>
			{posts && <DataTable columns={columnsPosts} data={posts} />}
			<h2 className='text-xl font-medium'>게시물 조회 목록</h2>
		</>
	);
};

export default AdminPosts;
