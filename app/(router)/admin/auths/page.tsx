'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { getPaginationRowModel, TableMeta } from '@tanstack/react-table';

import { getUsers } from '@/lib';
import { Button, DataTable } from '@/components';
import { TUser, TUserTable } from '@/service/user';

import columnsAuths from './columns-auths';

const AdminPosts = () => {
	const [users, setUsers] = React.useState<TUserTable[]>([]);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);

	const [pagination, setPagination] = React.useState({
		pageIndex: 0,
		pageSize: 10,
	});

	const { data: session, status } = useSession();

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

	React.useEffect(() => {
		console.log(users);
	}, [users]);

	const updateData = (rowIndex: number, columnId: string, newValue: string) => {
		setUsers(oldUsers =>
			oldUsers.map((row, index) => {
				if (index === rowIndex) {
					return {
						...row,
						[columnId]: newValue,
					};
				}
				return row;
			})
		);
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	return (
		<>
			<h2 className='text-xl font-medium mb-2'>사용자 권한 설정</h2>
			<DataTable
				columns={columnsAuths}
				data={users}
				options={{
					meta: { updateData },
					getPaginationRowModel: getPaginationRowModel(),
					state: { pagination },
					onPaginationChange: setPagination,
				}}
			/>

			{status === 'authenticated' && session.user.role === 'admin' && (
				<Button size='lg' className='w-full mt-8'>
					권한 수정
				</Button>
			)}
		</>
	);
};

export default AdminPosts;
