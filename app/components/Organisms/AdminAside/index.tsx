'use client';

import React from 'react';
import Link from 'next/link';
import { RiShieldStarLine, RiShieldCrossLine, RiDatabase2Line, RiDatabase2Fill, RiCoinFill, RiCoinLine } from 'react-icons/ri';
import { RxDashboard, RxGlobe, RxFile, RxFileText, RxFilePlus, RxFileMinus } from 'react-icons/rx';

import { cn } from '@/lib';
import { Accordion, Button } from '@/components';

import * as Types from './type';

const AdminAside = React.forwardRef<HTMLElement, Types.AdminAsideProps>((props, forwardRef) => {
	const { className, ...rest } = props;

	return (
		<aside ref={forwardRef} className={cn('absolute', 't-0', '-left-[256px]', 'w-[256px]', 'pl-10', 'pr-4', className)} {...rest}>
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
							<span className='pl-2'>사용자 관리</span>
						</span>
					</Accordion.Trigger>
					<Accordion.Content className='pb-2'>
						<Button variant='ghost' className='w-full justify-start' asChild>
							<Link href='/admin/auths'>
								<RiShieldStarLine size='1rem' />
								<span className='pl-2'>사용자 권한 조회</span>
							</Link>
						</Button>
						<Button variant='ghost' className='w-full justify-start' asChild>
							<Link href='/admin/auths/update'>
								<RiShieldCrossLine size='1rem' />
								<span className='pl-2'>사용자 권한 수정</span>
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
						<Button variant='ghost' className='w-full justify-start' asChild>
							<Link href='/admin/posts'>
								<RxFile size='1rem' />
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
								<RxFileText size='1rem' />
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
							<RiDatabase2Line size='1.25rem' />
							<span className='pl-2'>이미지 관리</span>
						</span>
					</Accordion.Trigger>
					<Accordion.Content className='pb-2'>
						<Button variant='ghost' className='w-full justify-start' asChild>
							<Link href='/admin/images'>
								<RiDatabase2Line size='1rem' />
								<span className='pl-2'>이미지 조회</span>
							</Link>
						</Button>
						<Button variant='ghost' className='w-full justify-start' asChild>
							<Link href='/admin/images/create'>
								<RiDatabase2Fill size='1rem' />
								<span className='pl-2'>이미지 업로드</span>
							</Link>
						</Button>
						<Button variant='ghost' className='w-full justify-start' asChild>
							<Link href='/admin/images/update'>
								<RiCoinFill size='1rem' />
								<span className='pl-2'>이미지 수정</span>
							</Link>
						</Button>
						<Button variant='ghost' className='w-full justify-start' asChild>
							<Link href='/admin/images/delete'>
								<RiCoinLine size='1rem' />
								<span className='pl-2'>이미지 삭제</span>
							</Link>
						</Button>
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
		</aside>
	);
});
AdminAside.displayName = 'AdminAside';

export default AdminAside;
