'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RxGithubLogo, RxGear } from 'react-icons/rx';

import { supabaseClient, cn } from '@/lib';
import { Button, DarkModeToggle, FormSearch } from '@/components';
import * as Type from './type';

const Header = React.forwardRef<HTMLElement, Type.HeaderProps>(
	(props, forwardRef) => {
		const router = useRouter();
		const { className, ...rest } = props;

		const handleGitHubLogin = async () => {
			const { error } = await supabaseClient.auth.signInWithOAuth({
				provider: 'github',
				options: {
					redirectTo: `${window.location.origin}/posts`,
				},
			});

			if (error) {
				console.error('GitHub login error:', error);
			}
		};

		const handleGitHubLogOut = async () => {
			await supabaseClient.auth.signOut();
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

							<Button variant='ghost' onClick={handleGitHubLogOut}>
								<RxGithubLogo size='1.25rem' title='깃허브' />
								<span className='pl-1'>로그아웃</span>
							</Button>

							<Button variant='ghost' size='icon' asChild>
								<Link href='/admin'>
									<RxGear size='1.25rem' />
									<span className='sr-only'>관리자</span>
								</Link>
							</Button>

							<Button variant='ghost' onClick={handleGitHubLogin}>
								<RxGithubLogo size='1.25rem' title='깃허브' />
								<span className='pl-1'>로그인</span>
							</Button>

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
