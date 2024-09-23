'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components';
import { TUser } from '@/service/user';
import { formatDate } from '@/lib';

const columnsAuths: ColumnDef<TUser>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
		meta: {
			headerGroup: {
				className: 'text-center min-w-80',
			},
			rows: {
				ellipsis: 2,
				ellipsisClassName: 'w-[15.5rem] break-keep',
			},
		},
	},
	{
		accessorKey: 'email',
		header: '이메일',
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
		accessorKey: 'createdAt',
		header: '생성일시',
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
		header: '수정일시',
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
		accessorKey: 'role',
		header: '사용자 분류',
		// cell: ({ getValue }) => {
		// 	return roleValue = getValue();
		// },
		meta: {
			headerGroup: {
				className: 'text-center min-w-64',
			},
			rows: {
				className: 'text-center',
			},
		},
	},
  // {
	// 	accessorKey: 'userPermissions',
	// 	header: '관리자 권한',
  //   cell: ({ getValue }) => {
	// 		const permissionsValue = getValue() as TUser['permissions'];
  //     const { manageUser: user } = permissionsValue;
			
	// 		return (
	// 			<>{`C: ${user.create} / R: ${user.read} / U: ${user.update} / D: ${user.delete}`}</>
	// 		);
	// 	},
	// 	meta: {
	// 		headerGroup: {
	// 			className: 'text-center min-w-64',
	// 		},
	// 		rows: {
	// 			className: 'text-center',
	// 		},
	// 	},
	// },
  // {
	// 	accessorKey: 'postPermissions',
	// 	header: '게시물 권한',
  //   cell: ({ getValue }) => {
	// 		const permissionsValue = getValue() as TUser['permissions'];
  //     const { managePost: post } = permissionsValue;
			
	// 		return (
	// 			<>{`C: ${post.create} / R: ${post.read} / U: ${post.update} / D: ${post.delete}`}</>
	// 		);
	// 	},
	// 	meta: {
	// 		headerGroup: {
	// 			className: 'text-center min-w-64',
	// 		},
	// 		rows: {
	// 			className: 'text-center',
	// 		},
	// 	},
	// },
];

export default columnsAuths;
