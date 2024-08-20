import React from 'react';

import * as Type from './type';
import { cn } from '@/lib';

const Footer = React.forwardRef<HTMLElement, Type.FooterProps>(
	(props, forwardRef) => {
		const { className, ...rest } = props;

		return (
			<footer className={cn(className)} ref={forwardRef} {...rest}>
				<div
					className={cn(
						'flex',
						'items-center',
						'justify-center',
						'h-20',
						'my-0',
						'mx-auto',
						'px-4',
						'w-full',
						'mobile:px-10',
						'desktop:w-[1280px]'
					)}
				>
					Copyright 2024. 이창기 All pictures cannot be copied without
					permission.
				</div>
			</footer>
		);
	}
);
Footer.displayName = 'Footer';

export default Footer;
