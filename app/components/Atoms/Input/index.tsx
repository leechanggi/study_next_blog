import * as React from 'react';

import { cn } from '@lib';
import * as Type from './type';

const Input = React.forwardRef<HTMLInputElement, Type.InputProps>(
	(props, forwardRef) => {
		const { className, type = 'text', ...rest } = props;
		return (
			<input
				type={type}
				className={cn(
					'flex',
					'h-10',
					'w-full',
					'rounded-md',
					'border',
					'px-3',
					'py-2',
					'text-sm',
					'placeholder:text-zinc-400',
					'disabled:cursor-not-allowed',
					'disabled:opacity-60',
					className
				)}
				ref={forwardRef}
				{...rest}
			/>
		);
	}
);
Input.displayName = 'Input';

export default Input;
