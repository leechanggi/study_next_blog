'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { RxSun, RxMoon } from 'react-icons/rx';

import { Button } from '@/components';
import * as Type from './type';

const DarkModeToggle = React.forwardRef<
	HTMLButtonElement,
	Type.DarkModeToggleProps
>((props, forwardRef) => {
	const { onClick, ...rest } = props;
	const { theme, setTheme } = useTheme();
	const [isTheme, setIsTheme] = React.useState(true);

	React.useEffect(() => {
		isTheme ? setTheme('light') : setTheme('dark');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isTheme]);

	const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		setIsTheme(prev => !prev);
		onClick?.(e);
	};

	return (
		<Button
			ref={forwardRef}
			variant='ghost'
			size='icon'
			onClick={handleClick}
			{...rest}
		>
			{isTheme ? (
				<>
					<RxSun size='1.25em' />
					<span className='sr-only'>어둡게 보기</span>
				</>
			) : (
				<>
					<RxMoon size='1.25em' />
					<span className='sr-only'>밝게 보기</span>
				</>
			)}
		</Button>
	);
});
DarkModeToggle.displayName = 'DarkModeToggle';

export default DarkModeToggle;
