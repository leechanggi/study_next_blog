'use client';

import React from 'react';
import { getPosts } from '@/lib';

import { DataTable } from '@/components';
import { TPosts } from '@/service/posts';
// import { TViews } from '@/service/views';
import { getColumnsPostsByAccessorKeys } from './columns-posts';
// import columnsViews from './columns-views';

const AdminPosts = () => {
	const [posts, setPosts] = React.useState<TPosts[]>([]);
	// const [views, setViews] = React.useState<TViews[]>([]);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedPosts = await getPosts(true);
				// const fetchedViews = await fetchViews();
				setPosts(fetchedPosts);
				// setViews(fetchedViews);
			} catch (err) {
				setError('일시적인 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	const columnsPosts = getColumnsPostsByAccessorKeys([
		'post_id',
		'title',
		'createdAt',
		'updatedAt',
		'tags',
		'imgSrc',
		'skip',
	]);

	return (
		<>
			<h2 className='text-xl font-medium mb-2'>게시물 조회</h2>
			<DataTable columns={columnsPosts} data={posts} />
		</>
	);
};

export default AdminPosts;
