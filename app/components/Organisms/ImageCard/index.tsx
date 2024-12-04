import React from 'react';

import * as Type from './type';
import { cn } from '@/lib';

const ImageCard = React.forwardRef<HTMLUListElement, Type.ImageCardProps>((props, forwardRef) => {
	const { children, className, ...rest } = props;
	return (
		<ul ref={forwardRef} className={cn('grid', 'grid-cols-3', 'gap-4', 'auto-rows-fr', className)} {...rest}>
			{children}
		</ul>
	);
});
ImageCard.displayName = 'ImageCard';

export default ImageCard;
