'use client';

import React from 'react';
import { RxCopy } from 'react-icons/rx';
import { ColumnDef } from '@tanstack/react-table';

import { Label, Checkbox, Button, Tooltip, Select } from '@/components';
import { TUserTable } from '@/service/user';
import { formatDate } from '@/lib';

type CustomTableMeta = {
	updateData: (rowIndex: number, columnId: string, newValue: any) => void;
};

const columnsAuths: ColumnDef<TUserTable>[] = [
	{
		accessorKey: 'id',
		header: '사용자 고유 ID',
		cell: ({ getValue }) => {
			const id = getValue() as TUserTable['id'];

			const handleCopy = () => {
				navigator.clipboard
					.writeText(id)
					.then(() => {
						alert('ID가 클립보드에 복사되었습니다.');
					})
					.catch(err => {
						console.error('클립보드 복사 실패:', err);
					});
			};

			return (
				<Tooltip.Provider>
					<Tooltip.Root>
						<Tooltip.Trigger asChild>
							<Button
								type='button'
								size='icon'
								variant='ghost'
								onClick={handleCopy}
							>
								<RxCopy size='1.25rem' />
								<span className='sr-only'>복사</span>
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content>{id}</Tooltip.Content>
					</Tooltip.Root>
				</Tooltip.Provider>
			);
		},
		meta: {
			headerGroup: {
				className: 'text-center min-w-32',
			},
			rows: {
				className: 'text-center',
			},
		},
	},
	{
		accessorKey: 'role',
		header: '사용자 분류',
		cell: ({ getValue, row, column, table }) => {
			const roleValue = getValue() as TUserTable['role'];
			const arrayRole = [
				{ value: 'admin', children: '관리자' },
				{ value: 'user', children: '사용자' },
			];

			return (
				<Select.Root
					defaultValue={roleValue}
					onValueChange={newValue => {
						const meta = table.options.meta as CustomTableMeta;
						meta.updateData(row.index, column.id, newValue);
					}}
				>
					<Select.Trigger className='w-full'>
						<Select.Value placeholder='사용자 분류' />
					</Select.Trigger>
					<Select.Content>
						{arrayRole.map(item => {
							const key = crypto.randomUUID();
							return (
								<Select.Item key={key} value={item.value}>
									{item.children}
								</Select.Item>
							);
						})}
					</Select.Content>
				</Select.Root>
			);
		},
		meta: {
			headerGroup: {
				className: 'text-center min-w-32',
			},
			rows: {
				className: 'text-center',
			},
		},
	},
	{
		accessorKey: 'email',
		header: '사용자 이메일',
		meta: {
			headerGroup: {
				className: 'text-center min-w-64',
			},
			rows: {
				className: 'text-center',
			},
		},
	},
	{
		accessorKey: 'userPermissions',
		header: '관리자 권한',
		cell: ({ getValue, row, column, table }) => {
			const user = getValue() as TUserTable['userPermissions'];
			const handleCheckedChange = (key: string, newValue: boolean) => {
				const meta = table.options.meta as CustomTableMeta;
				const userPermissions = {
					...row.original.userPermissions,
					[key]: newValue,
				};
				meta.updateData(row.index, column.id, { ...userPermissions });
			};

			return (
				<span className='flex justify-center items-center space-x-2'>
					<span className='flex justify-start items-center'>
						<Label htmlFor='userCreate'>C:</Label>
						<Checkbox
							id='userCreate'
							className='ml-1'
							size='sm'
							checked={user.create}
							onCheckedChange={(checked: boolean) =>
								handleCheckedChange('create', checked)
							}
						/>
					</span>
					<span className='flex justify-start items-center'>
						<Label htmlFor='userRead'>R:</Label>
						<Checkbox
							id='userRead'
							className='ml-1'
							size='sm'
							checked={user.read}
							onCheckedChange={(checked: boolean) =>
								handleCheckedChange('read', checked)
							}
						/>
					</span>
					<span className='flex justify-start items-center'>
						<Label htmlFor='userUpdate'>U:</Label>
						<Checkbox
							id='userUpdate'
							className='ml-1'
							size='sm'
							checked={user.update}
							onCheckedChange={(checked: boolean) =>
								handleCheckedChange('update', checked)
							}
						/>
					</span>
					<span className='flex justify-start items-center'>
						<Label htmlFor='userDelete'>D:</Label>
						<Checkbox
							id='userDelete'
							className='ml-1'
							size='sm'
							checked={user.delete}
							onCheckedChange={(checked: boolean) =>
								handleCheckedChange('delete', checked)
							}
						/>
					</span>
				</span>
			);
		},
		meta: {
			headerGroup: {
				className: 'text-center min-w-56',
			},
			rows: {
				className: 'text-center',
			},
		},
	},
	{
		accessorKey: 'postPermissions',
		header: '게시물 권한',
		cell: ({ getValue, row, column, table }) => {
			const post = getValue() as TUserTable['postPermissions'];
			const handleCheckedChange = (key: string, newValue: boolean) => {
				const meta = table.options.meta as CustomTableMeta;
				const postPermissions = {
					...row.original.postPermissions,
					[key]: newValue,
				};
				meta.updateData(row.index, column.id, { ...postPermissions });
			};

			return (
				<span className='flex justify-center items-center space-x-2'>
					<span className='flex justify-start items-center'>
						<Label htmlFor='postCreate'>C:</Label>
						<Checkbox
							id='postCreate'
							className='ml-1'
							size='sm'
							checked={post.create}
							onCheckedChange={(checked: boolean) =>
								handleCheckedChange('create', checked)
							}
						/>
					</span>
					<span className='flex justify-start items-center'>
						<Label htmlFor='postRead'>R:</Label>
						<Checkbox
							id='postRead'
							className='ml-1'
							size='sm'
							checked={post.read}
							onCheckedChange={(checked: boolean) =>
								handleCheckedChange('read', checked)
							}
						/>
					</span>
					<span className='flex justify-start items-center'>
						<Label htmlFor='postUpdate'>U:</Label>
						<Checkbox
							id='postUpdate'
							className='ml-1'
							size='sm'
							checked={post.update}
							onCheckedChange={(checked: boolean) =>
								handleCheckedChange('update', checked)
							}
						/>
					</span>
					<span className='flex justify-start items-center'>
						<Label htmlFor='postDelete'>D:</Label>
						<Checkbox
							id='postDelete'
							className='ml-1'
							size='sm'
							checked={post.delete}
							onCheckedChange={(checked: boolean) =>
								handleCheckedChange('delete', checked)
							}
						/>
					</span>
				</span>
			);
		},
		meta: {
			headerGroup: {
				className: 'text-center min-w-56',
			},
			rows: {
				className: 'text-center',
			},
		},
	},
	{
		accessorKey: 'createdAt',
		header: '계정 생성일시',
		cell: ({ getValue }) => {
			const dateValue = getValue() as Date;
			const { year, month, day, hour, minute, second } = formatDate(dateValue);
			return (
				<>
					{`${year}/${month}/${day}`}
					<br />
					{`${hour}시 ${minute}분 ${second}초`}
				</>
			);
		},
		meta: {
			headerGroup: {
				className: 'text-center w-[6.5rem]',
			},
			rows: {
				ellipsis: 2,
				ellipsisClassName: 'text-center w-24 break-keep',
			},
		},
	},
	{
		accessorKey: 'updatedAt',
		header: '계정 수정일시',
		cell: ({ getValue }) => {
			const dateValue = getValue() as Date;
			const { year, month, day, hour, minute, second } = formatDate(dateValue);
			return (
				<>
					{`${year}/${month}/${day}`}
					<br />
					{`${hour}시 ${minute}분 ${second}초`}
				</>
			);
		},
		meta: {
			headerGroup: {
				className: 'text-center w-[6.5rem]',
			},
			rows: {
				ellipsis: 2,
				ellipsisClassName: 'text-center w-24 break-keep',
			},
		},
	},
];

export default columnsAuths;
