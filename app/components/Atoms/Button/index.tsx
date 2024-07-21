'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import * as Type from './type';
import { cn } from '@lib';

const styles = cva(
	'inline-flex items-center justify-center font-medium whitespace-nowrap rounded-md transition-colors',
	{
		variants: {
			variant: {
				default:
					'bg-neutral-800 text-neutral-100 hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-800 dark:hover:bg-neutral-200',
				secondary:
					'bg-neutral-100 text-neutral-800 hover:bg-neutral-50 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800',
				destructive:
					'bg-red-600 text-neutral-100 hover:bg-red-500 dark:bg-red-800 dark:hover:bg-red-900',
				outline:
					'border border-neutral-200 bg-transparent text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-700',
				ghost:
					'bg-transparent text-neutral-800 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-700',
				link: 'text-neutral-800 underline-offset-4 decoration-neutral-800 hover:underline dark:text-neutral-100 dark:decoration-neutral-100',
			},
			size: {
				default: 'h-10 px-4 text-sm',
				sm: 'h-9 px-3 text-xs',
				lg: 'h-11 px-8 text-base',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

const Button = React.forwardRef<HTMLButtonElement, Type.ButtonProps>(
	(props, forwardRef) => {
		const {
			className,
			variant = 'default',
			size = 'default',
			asChild = false,
			...rest
		} = props;
		const Component = asChild ? Slot : 'button';

		return (
			<Component
				ref={forwardRef}
				className={cn(styles({ variant, size, className }))}
				{...rest}
			/>
		);
	}
);
Button.displayName = 'Button';

export type { Type };
export default Button;
