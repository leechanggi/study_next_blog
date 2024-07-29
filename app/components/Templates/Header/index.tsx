import React from 'react';
import Link from 'next/link';
import { RxMagnifyingGlass } from 'react-icons/rx';

import * as Type from './type';
import { Button, DarkModeToggle, DialogContact } from '@components';
import { cn } from '@lib';

const Header = React.forwardRef<HTMLElement, Type.HeaderProps>(
	(props, forwardRef) => {
		const { className, ...rest } = props;
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
				<div
					className={cn(
						'flex',
						'items-center',
						'justify-center',
						'h-20',
						'my-0',
						'mx-auto',
						'px-4',
						'w-full',
						'mobile:px-10',
						'desktop:w-[1280px]'
					)}
				>
					<div
						className={cn('flex', 'items-center', 'justify-between', 'w-full')}
					>
						<h1
							className={cn(
								'text-lg',
								'font-medium',
								'text-zinc-900',
								'dark:text-zinc-100'
							)}
						>
							<Link href='/'>LXYEX1379</Link>
						</h1>
						<div
							className={cn('flex', 'items-center', 'justify-start', 'gap-x-2')}
						>
							<DialogContact />
							<div className={cn('flex', 'items-center', 'justify-start')}>
								<Button variant='ghost' size='icon'>
									<RxMagnifyingGlass size='1.25em' />
									<span className='sr-only'>검색</span>
								</Button>
								<DarkModeToggle />
							</div>
						</div>
					</div>
				</div>
			</header>
		);
	}
);
Header.displayName = 'Header';

export default Header;
