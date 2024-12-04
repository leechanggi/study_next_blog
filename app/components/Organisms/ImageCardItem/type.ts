import Image from 'next/image';
import type { ComponentProps } from 'react';

type ImageProps = ComponentProps<typeof Image>;
type ImageCardItemElement = HTMLLIElement;
type ImageCardItemProps = {
	onCopyButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
} & Omit<React.HTMLAttributes<HTMLLIElement>, 'children'> &
	Omit<ImageProps, 'onClick'>;

export type { ImageCardItemElement, ImageCardItemProps };
