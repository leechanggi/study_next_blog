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
					'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-800 dark:hover:bg-zinc-200',
				secondary:
					'bg-zinc-100 text-zinc-800 hover:bg-zinc-50 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800',
				destructive:
					'bg-red-600 text-zinc-100 hover:bg-red-500 dark:bg-red-800 dark:hover:bg-red-900',
				outline:
					'border border-zinc-200 bg-transparent text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-700',
				ghost:
					'bg-transparent text-zinc-800 hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-700',
				link: 'text-zinc-800 underline-offset-4 decoration-zinc-800 hover:underline dark:text-zinc-100 dark:decoration-zinc-100',
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
