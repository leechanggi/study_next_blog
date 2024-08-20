import React from 'react';

import { useTheme } from 'next-themes';
import { RxSun, RxMoon } from 'react-icons/rx';

import * as Type from './type';
import { Button } from '@/components';

const DarkModeToggle = React.forwardRef<
	HTMLButtonElement,
	Type.DarkModeToggleProps
>((props, forwardRef) => {
	const { onClick, ...rest } = props;
	const { theme, setTheme } = useTheme();

	const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		setTheme(theme === 'dark' ? 'light' : 'dark');
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
			{theme === 'dark' ? (
				<>
					<RxMoon size='1.25em' />
					<span className='sr-only'>밝게 보기</span>
				</>
			) : (
				<>
					<RxSun size='1.25em' />
					<span className='sr-only'>어둡게 보기</span>
				</>
			)}
		</Button>
	);
});
DarkModeToggle.displayName = 'DarkModeToggle';

export default DarkModeToggle;
