'use client';

import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import { cn } from '@/lib';
import * as Types from './type';

const PopoverRoot = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
	Types.PopoverContentElement,
	Types.PopoverContentProps
>((props, forwardRef) => {
	const { className, align = 'center', sideOffset = 4, ...rest } = props;
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				ref={forwardRef}
				align={align}
				sideOffset={sideOffset}
				className={cn(
					'z-20',
					'w-64',
					'p-4',
					'rounded',
					'bg-white',
					'shadow',
					'dark:bg-zinc-900',
					'will-change-[transform,opacity]',
					'data-[state=open]:data-[side=top]:animate-slideDownAndFade',
					'data-[state=open]:data-[side=right]:animate-slideLeftAndFade',
					'data-[state=open]:data-[side=bottom]:animate-slideUpAndFade',
					'data-[state=open]:data-[side=left]:animate-slideRightAndFade',
					className
				)}
				{...rest}
			/>
		</PopoverPrimitive.Portal>
	);
});
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

const Popover = {
	Root: PopoverRoot,
	Trigger: PopoverTrigger,
	Content: PopoverContent,
};

export default Popover;
