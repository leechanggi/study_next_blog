'use client';

import React from 'react';
import { getPaginationRowModel } from '@tanstack/react-table';

import { getUsers } from '@/lib';
import { DataTable } from '@/components';
import { TUser, TUserTable } from '@/service/user';

import { getColumnsAuthsByAccessorKeys } from './columns-auths';

const AdminPosts = () => {
	const [users, setUsers] = React.useState<TUserTable[]>([]);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);

	const [pagination, setPagination] = React.useState({
		pageIndex: 0,
		pageSize: 10,
	});

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedUsers = await getUsers();
				const userTableData: TUserTable[] = fetchedUsers.map((user: TUser) => ({
					id: user.id,
					email: user.email,
					password: user.password,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
					role: user.role,
					postPermissions: user.permissions.managePost,
					userPermissions: user.permissions.manageUser,
				}));

				setUsers(userTableData);
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

	const columnsAuths = getColumnsAuthsByAccessorKeys(['id', 'role', 'email', 'userPermissions', 'postPermissions', 'createdAt', 'updatedAt']);

	return (
		<>
			<h2 className='text-xl font-medium mb-2'>사용자 권한 조회</h2>
			<DataTable
				columns={columnsAuths}
				data={users}
				options={{
					getPaginationRowModel: getPaginationRowModel(),
					state: { pagination },
					onPaginationChange: setPagination,
				}}
			/>
		</>
	);
};

export default AdminPosts;
