'use client';

import React from 'react';
import Link from 'next/link';

import { Button } from '@/components';
import { cn, useLoaded } from '@/lib';
import * as Type from './type';

const InfiniteTags = React.forwardRef<HTMLDivElement, Type.InfiniteTagsProps>(
	(props, forwardRef) => {
		const isLoaded = useLoaded();
		const { tags, tagsCount, postsCount, currentTag, className, ...rest } =
			props;

		return (
			<div
				className={cn(
					'flex',
					'items-center',
					'justify-start',
					'flex-nowrap',
					'overflow-x-auto',
					'overflow-y-hidden',
					'w-full',
					className
				)}
				ref={forwardRef}
				{...rest}
			>
				{isLoaded && (
					<>
						<Button
							variant={!currentTag ? 'default' : 'secondary'}
							className='rounded-full mr-4'
							asChild
						>
							<Link href={{ pathname: '/' }}>{`All (${postsCount})`}</Link>
						</Button>
						{tags.map(tag => (
							<Button
								key={tag}
								variant={currentTag === tag ? 'default' : 'secondary'}
								className='rounded-full mr-4'
								asChild
							>
								<Link
									href={{ query: { tag } }}
								>{`#${tag} (${tagsCount[tag]})`}</Link>
							</Button>
						))}
					</>
				)}
			</div>
		);
	}
);
InfiniteTags.displayName = 'InfiniteTags';

export default InfiniteTags;
