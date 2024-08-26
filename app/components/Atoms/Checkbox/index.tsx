'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { RxCheck } from 'react-icons/rx';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib';
import * as Types from './type';

const styles = cva(
	'relative peer shrink-0 rounded bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-700',
	{
		variants: {
			size: {
				default: 'w-6 h-6',
				sm: 'w-4 h-4',
				lg: 'w-8 h-8',
			},
		},
		defaultVariants: {
			size: 'default',
		},
	}
);

const renderSize = (size: Types.CheckboxProps['size']) => {
	switch (size) {
		case 'lg':
			return '1.5rem';
		case 'sm':
			return '0.75rem';
		default:
			return '1.25rem';
	}
};

const renderIndicatorIcon = (size: Types.CheckboxProps['size']) => {
	return (
		<RxCheck
			size={renderSize(size)}
			className={cn('text-zinc-700 dark:text-zinc-200')}
		/>
	);
};

const Checkbox = React.forwardRef<Types.CheckboxElement, Types.CheckboxProps>(
	(props, ref) => {
		const { className, size = 'default', ...rest } = props;

		return (
			<CheckboxPrimitive.Root
				ref={ref}
				className={cn(styles({ size, className }))}
				{...rest}
			>
				<CheckboxPrimitive.Indicator
					className={cn(
						'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
					)}
				>
					{renderIndicatorIcon(size)}
				</CheckboxPrimitive.Indicator>
			</CheckboxPrimitive.Root>
		);
	}
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export default Checkbox;
