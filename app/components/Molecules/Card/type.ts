import type { LinkProps } from 'next/link';
import type { TPosts } from '@/service/post';

type CardProps = {
	title: TPosts['title'];
	content: TPosts['content'];
	createdAt: TPosts['createdAt'];
	tags?: string[];
	imgSrc?: TPosts['imgSrc'];
} & LinkProps;

export type { CardProps };
