"use client";

import React from "react";
import { RxCopy } from "react-icons/rx";
import { ColumnDef } from "@tanstack/react-table";

import { Label, Checkbox, Button, Tooltip } from "@/components";
import { TUserTable } from "@/service/user";
import { formatDate } from "@/lib";

const columnsAuths: ColumnDef<TUserTable>[] = [
	{
		accessorKey: "id",
		header: "사용자 고유 ID",
		cell: ({ getValue }) => {
			const id = getValue() as TUserTable["id"];

			const handleCopy = () => {
				navigator.clipboard
					.writeText(id)
					.then(() => {
						alert("ID가 클립보드에 복사되었습니다.");
					})
					.catch(err => {
						console.error("클립보드 복사 실패:", err);
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
				className: "text-center min-w-32",
			},
			rows: {
				className: "text-center",
			},
		},
	},
	{
		accessorKey: "role",
		header: "사용자 분류",
		cell: ({ getValue }) => {
			const roleValue = getValue() as TUserTable["role"];
			return roleValue === "admin" ? "관리자" : "사용자";
		},
		meta: {
			headerGroup: {
				className: "text-center min-w-32",
			},
			rows: {
				className: "text-center",
			},
		},
	},
	{
		accessorKey: "email",
		header: "사용자 이메일",
		meta: {
			headerGroup: {
				className: "text-center min-w-64",
			},
			rows: {
				className: "text-center",
			},
		},
	},
	{
		accessorKey: "userPermissions",
		header: "관리자 권한",
		cell: ({ getValue }) => {
			const user = getValue() as TUserTable["userPermissions"];

			return (
				<span className='flex justify-center items-center space-x-2'>
					<span className='flex justify-start items-center'>
						<Label htmlFor='userCreate'>C:</Label>
						<Checkbox
							id='userCreate'
							className='ml-1'
							size='sm'
							checked={user.create}
							disabled
						/>
					</span>
					<span className='flex justify-start items-center'>
						<Label htmlFor='userRead'>R:</Label>
						<Checkbox
							id='userRead'
							className='ml-1'
							size='sm'
							checked={user.read}
							disabled
						/>
					</span>
					<span className='flex justify-start items-center'>
						<Label htmlFor='userUpdate'>U:</Label>
						<Checkbox
							id='userUpdate'
							className='ml-1'
							size='sm'
							checked={user.update}
							disabled
						/>
					</span>
					<span className='flex justify-start items-center'>
						<Label htmlFor='userDelete'>D:</Label>
						<Checkbox
							id='userDelete'
							className='ml-1'
							size='sm'
							checked={user.delete}
							disabled
						/>
					</span>
				</span>
			);
		},
		meta: {
			headerGroup: {
				className: "text-center min-w-56",
			},
			rows: {
				className: "text-center",
			},
		},
	},
	{
		accessorKey: "postPermissions",
		header: "게시물 권한",
		cell: ({ getValue }) => {
			const post = getValue() as TUserTable["postPermissions"];

			return (
				<span className='flex justify-center items-center space-x-2'>
					<span className='flex justify-start items-center'>
						<Label htmlFor='postCreate'>C:</Label>
						<Checkbox
							id='postCreate'
							className='ml-1'
							size='sm'
							checked={post.create}
							disabled
						/>
					</span>
					<span className='flex justify-start items-center'>
						<Label htmlFor='postRead'>R:</Label>
						<Checkbox
							id='postRead'
							className='ml-1'
							size='sm'
							checked={post.read}
							disabled
						/>
					</span>
					<span className='flex justify-start items-center'>
						<Label htmlFor='postUpdate'>U:</Label>
						<Checkbox
							id='postUpdate'
							className='ml-1'
							size='sm'
							checked={post.update}
							disabled
						/>
					</span>
					<span className='flex justify-start items-center'>
						<Label htmlFor='postDelete'>D:</Label>
						<Checkbox
							id='postDelete'
							className='ml-1'
							size='sm'
							checked={post.delete}
							disabled
						/>
					</span>
				</span>
			);
		},
		meta: {
			headerGroup: {
				className: "text-center min-w-56",
			},
			rows: {
				className: "text-center",
			},
		},
	},
	{
		accessorKey: "createdAt",
		header: "계정 생성일시",
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
				className: "text-center w-[6.5rem]",
			},
			rows: {
				ellipsis: 2,
				ellipsisClassName: "text-center w-24 break-keep",
			},
		},
	},
	{
		accessorKey: "updatedAt",
		header: "계정 수정일시",
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
				className: "text-center w-[6.5rem]",
			},
			rows: {
				ellipsis: 2,
				ellipsisClassName: "text-center w-24 break-keep",
			},
		},
	},
];

export default columnsAuths;
