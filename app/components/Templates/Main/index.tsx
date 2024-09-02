'use client';

import React from 'react';
import { cn } from '@/lib';
import * as Type from './type';

const Main = React.forwardRef<HTMLElement, Type.MainProps>(
	(props, forwardRef) => {
		const { className, children, ...rest } = props;

		return (
			<main
				ref={forwardRef}
				className={cn(
					'relative',
					'my-0',
					'mx-auto',
					'pt-20',
					'pb-24',
					'px-4',
					'w-full',
					'min-h-layoutHeight',
					'mobile:px-4',
					'tablet:w-[768px]',
					className
				)}
				{...rest}
			>
				{children}
			</main>
		);
	}
);
Main.displayName = 'Main';

export default Main;
