import React from 'react';
import { RxArrowLeft, RxArrowRight } from 'react-icons/rx';

import { cn } from '@/lib';
import { Button } from '@/components';
import * as Type from './type';
import Link from 'next/link';

const PostNavigator = React.forwardRef<HTMLElement, Type.PostNavigatorProps>(
	(props, forwardRef) => {
		const { prev, next, className, ...rest } = props;

		if (!prev && !next) {
			return null;
		}

		return (
			<nav
				className={cn(
					'flex',
					'items-center',
					'justify-between',
					'mt-10',
					className
				)}
				ref={forwardRef}
				{...rest}
			>
				{prev && (
					<div className={cn('w-full', next && 'w-[50%] pr-1')}>
						<Button
							variant='secondary'
							size='lg'
							className={cn('relative', 'w-full', 'h-auto', 'py-4')}
							asChild
						>
							<Link href={{ pathname: `/posts/${prev.post_id}` }}>
								<RxArrowLeft size='1.25em' className='absolute top-4 left-8' />
								<span className='block w-full pl-6'>
									<span className='block w-full font-normal text-sm'>
										이전 포스트로
									</span>
									<span className='block w-full mt-1 text-lg ellipsis-1'>
										{prev.title}
									</span>
								</span>
							</Link>
						</Button>
					</div>
				)}
				{next && (
					<div className={cn('w-full', prev && 'w-[50%] pl-1')}>
						<Button
							variant='default'
							size='lg'
							className={cn('relative', 'w-full', 'h-auto', 'py-4')}
							asChild
						>
							<Link href={{ pathname: `/posts/${next.post_id}` }}>
								<RxArrowRight
									size='1.25em'
									className='absolute top-4 right-8'
								/>
								<span className='block w-full pr-6'>
									<span className='block w-full text-sm font-normal text-right'>
										다음 포스트로
									</span>
									<span className='block w-full mt-1 text-lg text-right ellipsis-1'>
										{next.title}
									</span>
								</span>
							</Link>
						</Button>
					</div>
				)}
			</nav>
		);
	}
);
PostNavigator.displayName = 'PostNavigator';

export default PostNavigator;
