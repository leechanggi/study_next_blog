'use client';

import React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

import { cn } from '@/lib';
import * as Types from './type';

const ScrollBar = React.forwardRef<
	Types.ScrollBarElement,
	Types.ScrollBarProps
>((props, forwardRef) => {
	const { className, orientation = 'vertical', ...rest } = props;

	return (
		<ScrollAreaPrimitive.ScrollAreaScrollbar
			ref={forwardRef}
			orientation={orientation}
			className={cn(
				'flex',
				'touch-none',
				'select-none',
				'transition-colors',
				orientation === 'vertical' &&
					cn('h-full', 'w-2.5', 'border-l', 'border-l-transparent', 'p-[1px]'),
				orientation === 'horizontal' &&
					cn(
						'h-2.5',
						'flex-col',
						'border-t',
						'border-t-transparent',
						'p-[1px]'
					),
				className
			)}
			{...rest}
		>
			<ScrollAreaPrimitive.ScrollAreaThumb className='relative flex-1 rounded-full bg-zinc-200 dark:bg-zing-700' />
		</ScrollAreaPrimitive.ScrollAreaScrollbar>
	);
});
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

const ScrollArea = React.forwardRef<
	Types.ScrollAreaElement,
	Types.ScrollAreaProps
>((props, forwardRef) => {
	const { className, children, ...rest } = props;
	return (
		<ScrollAreaPrimitive.Root
			ref={forwardRef}
			className={cn('relative', 'overflow-hidden', className)}
			{...rest}
		>
			<ScrollAreaPrimitive.Viewport className='h-full w-full rounded-[inherit]'>
				{children}
			</ScrollAreaPrimitive.Viewport>
			<ScrollBar />
			<ScrollAreaPrimitive.Corner />
		</ScrollAreaPrimitive.Root>
	);
});
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

export type { Types as ScrollAreaTypes };
export default ScrollArea;
