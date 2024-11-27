'use client';

import React from 'react';
import Link from 'next/link';
import { getPaginationRowModel } from '@tanstack/react-table';

import { cn, getUsers } from '@/lib';
import { DataTable, Button } from '@/components';
import { TUser, TUserTable } from '@/service/user';

import columnsAuths from '../columns-auths';

const AdminAuthsUpdatePage = () => {
	const [users, setUsers] = React.useState<TUserTable[]>([]);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);

	const [pagination, setPagination] = React.useState({
		pageIndex: 0,
		pageSize: 10,
	});
	const [rowSelection, setRowSelection] = React.useState<{ [key: string]: boolean }>({});
	const [idSelection, setIdSelection] = React.useState<string | null>(null);

	const isUpdateButtonDisabled = idSelection === null;

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
		const selectedRowKey = Object.keys(rowSelection).find(key => rowSelection[key]);

		if (selectedRowKey !== undefined) {
			const selectedId = users[parseInt(selectedRowKey)].id;
			setIdSelection(selectedId);
		} else {
			setIdSelection(null);
		}
	}, [users, rowSelection]);

	if (loading) return <div>Loading...</div>;
	if (!!error) return <div>{error}</div>;

	return (
		<>
			<h2 className='text-xl font-medium mb-2'>사용자 권한 수정</h2>
			<DataTable
				columns={columnsAuths}
				data={users}
				options={{
					enableRowSelection: true,
					enableMultiRowSelection: false,
					getPaginationRowModel: getPaginationRowModel(),
					state: { pagination, rowSelection },
					onPaginationChange: setPagination,
					onRowSelectionChange: setRowSelection,
				}}
			/>

			<Button
				size='lg'
				className={cn('w-full', 'mt-8', isUpdateButtonDisabled && 'cursor-not-allowed opacity-60')}
				aria-disabled={isUpdateButtonDisabled}
				tabIndex={isUpdateButtonDisabled ? -1 : undefined}
				asChild
			>
				<Link href={isUpdateButtonDisabled ? '' : `/admin/auths/update/${idSelection}`} passHref={isUpdateButtonDisabled}>
					게시물 수정
				</Link>
			</Button>
		</>
	);
};

export default AdminAuthsUpdatePage;
