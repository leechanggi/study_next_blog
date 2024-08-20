'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

import { cn } from '@/lib';
import * as Type from './type';

const Label = React.forwardRef<Type.LabelElement, Type.LabelProps>(
	(props, ref) => {
		const { className, ...rest } = props;

		return (
			<LabelPrimitive.Root
				ref={ref}
				className={cn('block', 'w-full', 'text-sm', 'font-medium', className)}
				{...rest}
			/>
		);
	}
);
Label.displayName = LabelPrimitive.Root.displayName;

export default Label;
