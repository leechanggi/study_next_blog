import type { LinkProps } from 'next/link';

type CardProps = {
	title: string;
	content: string;
	createdAt: string;
	tags?: string[];
	imgSrc?: string;
} & LinkProps;

export type { CardProps };
