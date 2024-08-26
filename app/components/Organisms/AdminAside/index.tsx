'use client';

import React from 'react';
import Link from 'next/link';
import { RiShieldStarLine } from 'react-icons/ri';
import {
	RxDashboard,
	RxGlobe,
	RxGear,
	RxFile,
	RxFileText,
	RxFilePlus,
	RxFileMinus,
	RxEnvelopeClosed,
	RxPencil2,
	RxLockClosed,
	RxMagnifyingGlass,
} from 'react-icons/rx';

import { cn } from '@/lib';
import { Accordion, Button } from '@/components';

import * as Types from './type';

const AdminAside = React.forwardRef<HTMLElement, Types.AdminAsideProps>(
	(props, forwardRef) => {
		const { className, ...rest } = props;

		return (
			<aside
				ref={forwardRef}
				className={cn(
					'absolute',
					't-0',
					'-left-[256px]',
					'w-[256px]',
					'pl-10',
					'pr-4',
					className
				)}
				{...rest}
			>
				<Accordion.Root type='multiple' className='w-full'>
					<Accordion.Item value='item-1'>
						<Accordion.Trigger>
							<span className='flex items-center'>
								<RxDashboard size='1.25rem' />
								<span className='pl-2'>대시보드</span>
							</span>
						</Accordion.Trigger>
						<Accordion.Content className='pb-2'>
							<Button variant='ghost' className='w-full justify-start' asChild>
								<Link href='/admin'>
									<RxGlobe size='1rem' />
									<span className='pl-2'>대시보드 홈</span>
								</Link>
							</Button>
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value='item-2'>
						<Accordion.Trigger>
							<span className='flex items-center'>
								<RiShieldStarLine size='1.25rem' />
								<span className='pl-2'>관리자 권한</span>
							</span>
						</Accordion.Trigger>
						<Accordion.Content className='pb-2'>
							<Button variant='ghost' className='w-full justify-start' asChild>
								<Link href='/admin/auths'>
									<RxGear size='1rem' />
									<span className='pl-2'>관리자 권한 설정</span>
								</Link>
							</Button>
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value='item-3'>
						<Accordion.Trigger>
							<span className='flex items-center'>
								<RxFile size='1.25rem' />
								<span className='pl-2'>게시물 관리</span>
							</span>
						</Accordion.Trigger>
						<Accordion.Content className='pb-2'>
							{/* 게시물 입력 및 수정, 게시물 숨기기 및 삭제, 각 게시물의 조회수, 각
							게시물의 조회시간 */}
							<Button variant='ghost' className='w-full justify-start' asChild>
								<Link href='/admin/posts'>
									<RxFileText size='1rem' />
									<span className='pl-2'>게시물 조회</span>
								</Link>
							</Button>
							<Button variant='ghost' className='w-full justify-start' asChild>
								<Link href='/admin/posts/create'>
									<RxFilePlus size='1rem' />
									<span className='pl-2'>게시물 생성</span>
								</Link>
							</Button>
							<Button variant='ghost' className='w-full justify-start' asChild>
								<Link href='/admin/posts/update'>
									<RxFilePlus size='1rem' />
									<span className='pl-2'>게시물 수정</span>
								</Link>
							</Button>
							<Button variant='ghost' className='w-full justify-start' asChild>
								<Link href='/admin/posts/delete'>
									<RxFileMinus size='1rem' />
									<span className='pl-2'>게시물 삭제</span>
								</Link>
							</Button>
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value='item-4'>
						<Accordion.Trigger>
							<span className='flex items-center'>
								<RxEnvelopeClosed size='1.25rem' />
								<span className='pl-2'>메일 관리</span>
							</span>
						</Accordion.Trigger>
						<Accordion.Content className='pb-2'>
							<Button variant='ghost' className='w-full justify-start' asChild>
								<Link href='/admin/posts/delete'>
									<RxPencil2 size='1rem' />
									<span className='pl-2'>금칙어 생성 및 수정</span>
								</Link>
							</Button>
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value='item-5'>
						<Accordion.Trigger>
							<span className='flex items-center'>
								<RxLockClosed size='1.25rem' />
								<span className='pl-2'>계정 관리</span>
							</span>
						</Accordion.Trigger>
						<Accordion.Content className='pb-2'>
							<Button variant='ghost' className='w-full justify-start' asChild>
								<Link href='/admin/posts/delete'>
									<RxMagnifyingGlass size='1rem' />
									<span className='pl-2'>계정 검색</span>
								</Link>
							</Button>
							{/* 로그인 시 로그인한 계정정보 기록, 조회한
							게시물, 조회한 게시물 당 접속 시간 */}
						</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
			</aside>
		);
	}
);
AdminAside.displayName = 'AdminAside';

export default AdminAside;
