import React from 'react';
import Link from 'next/link';
import { RxMagnifyingGlass } from 'react-icons/rx';

import * as Type from './type';
import { Button, DarkModeToggle } from '@components';
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
					'shadow',
					'shadow-neutral-200',
					'backdrop-blur-sm',
					'z-10',
					'dark:bg-neutral-900/80',
					'dark:shadow-neutral-800',
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
						<div>
							<Link href='/'>
								<h1
									className={cn(
										'text-lg',
										'font-medium',
										'text-neutral-900',
										'dark:text-neutral-100'
									)}
								>
									LXYEX1379
								</h1>
							</Link>
						</div>
						<div
							className={cn('flex', 'items-center', 'justify-start', 'gap-x-2')}
						>
							<Button size='sm' asChild>
								<Link href='/contact'>Contact ME</Link>
							</Button>
							<div className={cn('flex', 'items-center', 'justify-start')}>
								<Button variant='ghost' size='icon' asChild>
									<Link href='/search'>
										<RxMagnifyingGlass size='1.25em' />
										<span className='sr-only'>검색</span>
									</Link>
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
