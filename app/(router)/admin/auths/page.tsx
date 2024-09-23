'use client';

import React from 'react';
import { getUsers } from '@/lib';

import { DataTable } from '@/components';
import { TUser } from '@/service/user';
import columnsAuths from './columns-auths';

const AdminPosts = () => {
	const [users, setUsers] = React.useState<TUser[]>([]);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedUsers = await getUsers();
				setUsers(fetchedUsers);
			} catch (err) {
				setError('일시적인 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	React.useEffect(() => {
		console.log(users)
	}, [users])

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	// const columnsPosts = getColumnsPostsByAccessorKeys([
	// 	'id',
	// 	'title',
	// 	'createdAt',
	// 	'updatedAt',
	// 	'tags',
	// 	'imgSrc',
	// 	'skip',
	// ]);

	return (
		<>
			<h2 className='text-xl font-medium mb-2'>사용자 권한 설정</h2>
			<DataTable columns={columnsAuths} data={users} />
		</>
	);
};

export default AdminPosts;
