import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RxCalendar } from 'react-icons/rx';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';

import { cn, formatDate } from '@lib';
import * as Type from './type';

const Card = React.forwardRef<HTMLAnchorElement, Type.CardProps>(
	(props, forwardRef) => {
		const {
			href = '#none',
			title,
			content,
			createdAt,
			tags,
			imgSrc,
			...rest
		} = props;

		const { year, month, day } = formatDate(createdAt);

		const isValidURL = (url: string) => {
			try {
				new URL(url);
				return true;
			} catch (e) {
				return false;
			}
		};

		return (
			<Link
				ref={forwardRef}
				href={href}
				className={cn(
					'flex',
					'flex-col',
					'w-full',
					'h-full',
					'rounded',
					'bg-white',
					'shadow-md',
					'overflow-hidden',
					'transition',
					'ease-in-out',
					'hover:shadow-lg',
					'hover:text-blue-600',
					'dark:bg-zinc-800',
					'dark:hover:text-blue-400'
				)}
				{...rest}
			>
				{imgSrc && isValidURL(imgSrc) && (
					<AspectRatio.Root ratio={16 / 9} className='overflow-hidden'>
						<Image
							src={imgSrc}
							alt={title}
							width={360}
							height={360}
							className={cn('w-full')}
							priority
						/>
					</AspectRatio.Root>
				)}
				<div className='flex flex-col justify-between p-4 w-full flex-1'>
					<h2 className='text-lg font-medium ellipsis-2'>{title}</h2>
					<div className='mt-2'>
						{tags && (
							<ul className='flex gap-2'>
								{tags.map((tag, index) => (
									<li
										key={index}
										className='text-sm text-zinc-600 dark:text-zinc-200'
									>
										#{tag}
									</li>
								))}
							</ul>
						)}
						<span className='flex items-center justify-end mt-4 text-sm text-zinc-600 dark:text-zinc-200'>
							<RxCalendar size='1.25em' />
							<span className='pl-1'>{`${year}년 ${month}월 ${day}일`}</span>
						</span>
					</div>
				</div>
			</Link>
		);
	}
);
Card.displayName = 'Card';

export default Card;
