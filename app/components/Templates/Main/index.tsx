import React from 'react';

import * as Type from './type';
import { cn } from '@lib';

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
