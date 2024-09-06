'use client';

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

import { cn } from '@/lib';
import { Button, DarkModeToggle, FormSearch } from '@/components';
import * as Type from './type';

const Header = React.forwardRef<HTMLElement, Type.HeaderProps>(
	(props, forwardRef) => {
		const { className, ...rest } = props;
		const { data: session, status } = useSession();

		React.useEffect(() => {
			if (status === 'authenticated') {
				console.log('Session updated:', session);
				// 세션이 변경되었을 때 실행할 로직
			} else if (status === 'unauthenticated') {
				console.log('User is not logged in');
				// 로그아웃 처리 등
			}
		}, [session, status]);

		return (
			<header
				ref={forwardRef}
				className={cn(
					'sticky',
					'top-0',
					'bg-white/80',
					'backdrop-blur-sm',
					'z-10',
					'dark:bg-zinc-900/80',
					className
				)}
				{...rest}
			>
				<div className='flex items-center justify-center h-20 my-0 mx-auto px-4 w-full mobile:px-10 desktop:w-[1280px]'>
					<div className='flex items-center justify-between w-full'>
						<h1 className='text-lg font-medium text-zinc-900 dark:text-zinc-100'>
							<Link href='/'>이창기 개발 블로그</Link>
						</h1>
						<nav className='flex items-center justify-start gap-x-2'>
							<FormSearch />
							<Button asChild>
								<Link href='/auth/login'>로그인</Link>
							</Button>
							<Button onClick={() => signOut()}>로그아웃</Button>
							<DarkModeToggle />
						</nav>
					</div>
				</div>
			</header>
		);
	}
);
Header.displayName = 'Header';

export default Header;
