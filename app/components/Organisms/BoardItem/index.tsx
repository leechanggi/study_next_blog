import React from 'react';

import * as Type from './type';
import { cn } from '@/lib';

const BoardItem = React.forwardRef<HTMLLIElement, Type.BoardItemProps>(
	(props, forwardRef) => {
		const { className, children, ...rest } = props;
		return (
			<li ref={forwardRef} className={cn(className)} {...rest}>
				{children}
			</li>
		);
	}
);
BoardItem.displayName = 'BoardItem';

export default BoardItem;
