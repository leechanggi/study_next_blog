'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import Marquee from 'react-fast-marquee';

import { Button } from '@components';
import * as Type from './type';

const InfiniteTags = React.forwardRef<HTMLDivElement, Type.InfiniteTagsProps>(
	(props, forwardRef) => {
		const { theme } = useTheme();
		const {
			tags,
			currentTag,
			className,
			autoFill = true,
			play = true,
			pauseOnHover = true,
			speed = 25,
			gradient = true,
			gradientColor = theme === 'dark' ? '#171717' : '#ffffff',
			gradientWidth = 48,
			...rest
		} = props;

		const [isClient, setIsClient] = React.useState(false);

		React.useEffect(() => {
			setIsClient(true);
		}, []);

		if (!isClient) {
			return null;
		}

		return (
			<Marquee
				ref={forwardRef}
				autoFill={autoFill}
				play={play}
				pauseOnHover={pauseOnHover}
				speed={speed}
				gradient={gradient}
				gradientColor={gradientColor}
				gradientWidth={gradientWidth}
				{...rest}
			>
				<Button
					variant={!currentTag ? 'default' : 'secondary'}
					className='rounded-full mr-4'
					asChild
				>
					<Link href={{ pathname: '/' }}>All</Link>
				</Button>
				{tags.map(tag => (
					<Button
						key={tag}
						variant={currentTag === tag ? 'default' : 'secondary'}
						className='rounded-full mr-4'
						asChild
					>
						<Link href={{ query: { tag } }}>#{tag}</Link>
					</Button>
				))}
			</Marquee>
		);
	}
);
InfiniteTags.displayName = 'InfiniteTags';

export default InfiniteTags;
