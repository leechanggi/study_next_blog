import React from 'react';

import * as Type from './type';
import { cn } from '@/lib';

const Board = React.forwardRef<HTMLUListElement, Type.BoardProps>(
	(props, forwardRef) => {
		const { children, className, ...rest } = props;
		return (
			<ul
				ref={forwardRef}
				className={cn(
					'grid',
					'grid-cols-1',
					'gap-4',
					'auto-rows-fr',
					'tablet:grid-cols-2',
					className
				)}
				{...rest}
			>
				{children}
			</ul>
		);
	}
);
Board.displayName = 'Board';

export default Board;
