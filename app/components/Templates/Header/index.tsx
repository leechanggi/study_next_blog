'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useDispatch } from 'react-redux';

import { cn } from '@/lib';
import { clearSession } from '@store/sessionSlice';
import { Button, DarkModeToggle, FormSearch } from '@/components';

import * as Type from './type';

const Header = React.forwardRef<HTMLElement, Type.HeaderProps>(
	(props, forwardRef) => {
		const { className, ...rest } = props;
		const router = useRouter();
		const dispatch = useDispatch();
		const { status } = useSession();

		const handleSignOut = () => {
			signOut();
			dispatch(clearSession());
			router.push('/');
		};

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
							{status === 'authenticated' ? (
								<Button onClick={handleSignOut}>로그아웃</Button>
							) : (
								<Button asChild>
									<Link href='/auth/login'>로그인</Link>
								</Button>
							)}
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
