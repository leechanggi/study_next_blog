import React from 'react';
import axios from 'axios';

import { DataTable } from '@components';
import { TPosts } from '@service/posts';
import { TViews } from '@service/views';
import columnsPosts from './columns-posts';
import columnsViews from './columns-views';

const revalidate = 86400;
const apiUrl = process.env.NEXT_PUBLIC_API_HOST || '';

const getPosts = async () => {
	const url = `${apiUrl}/api/posts`;
	const headers = {
		'Cache-Control': `max-age=${revalidate}, stale-while-revalidate=604800`,
	};

	try {
		const { data } = await axios.get(url, { headers });
		return data;
	} catch (error) {
		console.error('Failed to fetch posts:', error);
		throw new Error(
			'일시적인 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.'
		);
	}
};

const getViews = async () => {
	const url = `${apiUrl}/api/views`;
	const headers = {
		'Cache-Control': `max-age=${revalidate}, stale-while-revalidate=604800`,
	};

	try {
		const { data } = await axios.get(url, { headers });
		return data;
	} catch (error) {
		console.error('Failed to fetch views:', error);
		throw new Error(
			'일시적인 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.'
		);
	}
};

const AdminPosts = async () => {
	const { data: posts }: { data: TPosts[] } = await getPosts();
	const { data: views }: { data: TViews[] } = await getViews();

	return (
		<>
			<div>
				<h2 className='text-xl font-medium mb-2'>게시물 목록</h2>
				{posts && (
					<DataTable columns={columnsPosts} data={posts} isPagination />
				)}
			</div>
			<div className='mt-10'>
				<h2 className='text-xl font-medium mb-2'>게시물 조회</h2>
				{views && <DataTable columns={columnsViews} data={views} />}
			</div>
		</>
	);
};

export default AdminPosts;
