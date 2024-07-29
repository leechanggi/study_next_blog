import * as React from 'react';

import { cn } from '@lib';
import * as Type from './type';

const Textarea = React.forwardRef<HTMLTextAreaElement, Type.TextareaProps>(
	(props, forwardRef) => {
		const { className, ...rest } = props;
		return (
			<textarea
				className={cn(
					'flex',
					'min-h-20',
					'w-full',
					'rounded-md',
					'border',
					'px-3',
					'py-2',
					'text-sm',
					'placeholder:text-zinc-400',
					'disabled:cursor-not-allowed',
					'disabled:opacity-60',
					'resize-none',
					className
				)}
				ref={forwardRef}
				{...rest}
			/>
		);
	}
);
Textarea.displayName = 'Textarea';

export default Textarea;
