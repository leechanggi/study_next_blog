'use client';

import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { LuCircle } from 'react-icons/lu';

import { cn } from '@/lib';
import * as Types from './type';

const RadioGroupRoot = React.forwardRef<
	Types.RadioGroupRootElement,
	Types.RadioGroupRootProps
>((props, ref) => {
	const { className, ...rest } = props;
	return (
		<RadioGroupPrimitive.Root ref={ref} className={cn(className)} {...rest} />
	);
});
RadioGroupRoot.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
	Types.RadioGroupItemElement,
	Types.RadioGroupItemProps
>((props, ref) => {
	const { className, ...rest } = props;
	return (
		<RadioGroupPrimitive.Item
			ref={ref}
			className={cn(
				'relative',
				'shrink-0',
				'h-6',
				'w-6',
				'rounded-full',
				'bg-zinc-200',
				'disabled:cursor-not-allowed',
				'disabled:opacity-60',
				'dark:bg-zinc-700',
				className
			)}
			{...rest}
		>
			<RadioGroupPrimitive.Indicator
				className={cn(
					'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
				)}
			>
				<LuCircle
					size='0.75rem'
					className={cn(
						'text-zinc-700 dark:text-zinc-200 fill-zinc-700 dark:fill-zinc-200'
					)}
				/>
			</RadioGroupPrimitive.Indicator>
		</RadioGroupPrimitive.Item>
	);
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

const RadioGroup = {
	Root: RadioGroupRoot,
	Item: RadioGroupItem,
};

export default RadioGroup;
