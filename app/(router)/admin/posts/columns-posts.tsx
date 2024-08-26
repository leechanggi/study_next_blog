'use client';

import React from 'react';
import Image from 'next/image';
import { RxDotsHorizontal } from 'react-icons/rx';
import { ColumnDef } from '@tanstack/react-table';

import { cn, formatDate, splitComma } from '@/lib';
import {
	Popover,
	Button,
	ScrollArea,
	Dialog,
	Input,
	Label,
	Checkbox,
} from '@/components';
import { TPosts } from '@/service/posts';

const columnsPosts: ColumnDef<TPosts>[] = [
	{
		accessorKey: 'radioSelector',
		header: '선택',
		cell: ({ row }) => {
			const postId = row.original.post_id.toString();

			return (
				<Checkbox
					id={`radioSelector-${postId}`}
					value={postId}
					checked={row.getIsSelected()}
					disabled={!row.getCanSelect()}
					onClick={row.getToggleSelectedHandler()}
					aria-label={`ID ${postId} 선택`}
				/>
			);
		},
		meta: {
			headerGroup: {
				className: 'text-center min-w-20',
			},
			rows: {
				className: 'text-center',
			},
		},
	},
	{
		accessorKey: 'post_id',
		header: 'ID',
		meta: {
			headerGroup: {
				className: 'text-center min-w-20',
			},
			rows: {
				className: 'text-center',
			},
		},
	},
	{
		accessorKey: 'title',
		header: '제목',
		meta: {
			headerGroup: {
				className: 'text-center min-w-64',
			},
			rows: {
				ellipsis: 2,
				ellipsisClassName: 'w-[15.5rem] break-keep',
			},
		},
	},
	{
		accessorKey: 'description',
		header: '설명',
		meta: {
			headerGroup: {
				className: 'text-center min-w-64',
			},
			rows: {
				ellipsis: 2,
				ellipsisClassName: 'w-[15.5rem] break-keep',
			},
		},
	},
	{
		accessorKey: 'content',
		header: '내용',
		meta: {
			headerGroup: {
				className: 'text-center min-w-64',
			},
			rows: {
				ellipsis: 2,
				ellipsisClassName: 'w-[15.5rem] break-keep',
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
		accessorKey: 'tags',
		header: '태그',
		cell: ({ getValue }) => {
			const tags = getValue() as string;
			const ArrayTags = splitComma(tags);

			if (ArrayTags.length < 1) {
				return false;
			}

			return (
				<Popover.Root>
					<Popover.Trigger asChild>
						<Button size='icon' variant='ghost'>
							<RxDotsHorizontal size='1.25rem' />
							<span className='sr-only'>태그</span>
						</Button>
					</Popover.Trigger>
					<Popover.Content className='w-32 p-0'>
						<ScrollArea className='max-h-72'>
							<div className='p-4'>
								<h4 className='mb-4 text-sm font-medium'>Tags</h4>
								{ArrayTags.map((tag, index) => {
									return (
										<div key={index} className='text-sm pb-2 mb-2 border-b'>
											{tag}
										</div>
									);
								})}
							</div>
						</ScrollArea>
					</Popover.Content>
				</Popover.Root>
			);
		},
		meta: {
			headerGroup: {
				className: 'text-center min-w-12',
			},
			rows: {
				className: 'text-center',
			},
		},
	},
	{
		accessorKey: 'imgSrc',
		header: '대표 이미지',
		cell: ({ getValue }) => {
			const imgSrc = getValue() as string;

			if (!imgSrc) {
				return;
			}

			const handleClick = () => {
				navigator.clipboard
					.writeText(imgSrc)
					.then(() => {
						alert('URL이 클립보드에 복사되었습니다.');
					})
					.catch(err => {
						console.error('URL 복사에 실패했습니다:', err);
					});
			};

			return (
				<Dialog
					trigger={
						<Button size='icon' variant='ghost'>
							<RxDotsHorizontal size='1.25rem' />
							<span className='sr-only'>대표 이미지</span>
						</Button>
					}
					content={
						<>
							<ScrollArea className='h-[261px]'>
								<Image
									src={imgSrc}
									alt='대표 이미지 미리보기'
									width={0}
									height={0}
									className={cn('w-full', 'h-auto')}
									priority
									unoptimized
								/>
							</ScrollArea>

							<Label htmlFor='imgSrc' className='mt-4'>
								대표 이미지 URL
							</Label>
							<div className='flex items-center justify-between mt-1 space-x-2'>
								<Input
									type='text'
									id='imgSrc'
									value={imgSrc}
									readOnly
									disabled
								/>
								<Button
									type='button'
									variant='secondary'
									className='shrink-0'
									onClick={handleClick}
								>
									URL복사
								</Button>
							</div>
						</>
					}
					title='대표 이미지 미리보기'
				/>
			);
		},
		meta: {
			headerGroup: {
				className: 'text-center min-w-24',
			},
			rows: {
				className: 'text-center',
			},
		},
	},
	{
		accessorKey: 'skip',
		header: '숨김',
		cell: ({ getValue }) => {
			const StringSkip = getValue() as boolean;

			return (
				<>
					<Label className='sr-only w-0' htmlFor='skip'>
						숨김
					</Label>
					<Checkbox id='skip' checked={StringSkip} disabled />
				</>
			);
		},
		meta: {
			headerGroup: {
				className: 'text-center min-w-20',
			},
			rows: {
				className: 'text-center',
			},
		},
	},
];

const getColumnsPostsByAccessorKeys = (accessorKeys: string[]) => {
	return columnsPosts.filter(column =>
		accessorKeys.includes(
			(column as { accessorKey?: string }).accessorKey || ''
		)
	);
};

export { getColumnsPostsByAccessorKeys };
export default columnsPosts;
