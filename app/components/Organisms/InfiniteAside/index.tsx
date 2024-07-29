'use client';

import React from 'react';
import Link from 'next/link';

import { Button } from '@components';
import { cn, useLoaded } from '@lib';
import * as Type from './type';

const InfiniteAside = React.forwardRef<HTMLDivElement, Type.InfiniteAsideProps>(
	(props, forwardRef) => {
		const isLoaded = useLoaded();
		const { tags, tagsCount, currentTag, className, ...rest } = props;

		return (
			<aside
				className={cn(
					'absolute',
					't-0',
					'-left-[256px]',
					'w-[256px]',
					'pl-10',
					'pr-4',
					className
				)}
				ref={forwardRef}
				{...rest}
			>
				<div className={cn('text-lg', 'font-medium', 'border-b', 'pb-2')}>
					태그 목록
				</div>
				{isLoaded && (
					<ul className='mt-4'>
						<li className='flex'>
							<Button
								variant={!currentTag ? 'default' : 'secondary'}
								size='sm'
								className={cn(
									'ellipsis-1',
									'!inline-block',
									'rounded-full',
									'max-w-full',
									'py-[0.625rem]'
								)}
								asChild
							>
								<Link
									href={{ pathname: '/' }}
								>{`전체보기 (${tags.length})`}</Link>
							</Button>
						</li>
						{tags.map(tag => (
							<li key={tag} className='flex mt-2'>
								<Button
									variant={currentTag === tag ? 'default' : 'secondary'}
									size='sm'
									className={cn(
										'ellipsis-1',
										'!inline-block',
										'rounded-full',
										'max-w-full',
										'py-[0.625rem]'
									)}
									asChild
								>
									<Link
										href={{ query: { tag } }}
									>{`#${tag} (${tagsCount[tag]})`}</Link>
								</Button>
							</li>
						))}
					</ul>
				)}
			</aside>
		);
	}
);
InfiniteAside.displayName = 'InfiniteAside';

export default InfiniteAside;
