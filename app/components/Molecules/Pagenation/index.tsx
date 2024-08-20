import React from 'react';
import Link from 'next/link';
import { RxCaretLeft, RxCaretRight, RxDotsHorizontal } from 'react-icons/rx';

import { cn } from '@/lib';
import { Button } from '@/components';
import * as Types from './type';

const PaginationRoot = React.forwardRef<
	Types.PaginationRootElement,
	Types.PaginationRootProps
>((props, forwardRef) => {
	const { className, ...rest } = props;
	return (
		<nav
			ref={forwardRef}
			role='navigation'
			aria-label='pagination'
			className={cn('mx-auto', 'flex', 'w-full', 'justify-center', className)}
			{...rest}
		/>
	);
});
PaginationRoot.displayName = 'PaginationRoot';

const PaginationContent = React.forwardRef<
	Types.PaginationContentElement,
	Types.PaginationContentProps
>((props, forwardRef) => {
	const { className, ...rest } = props;
	return (
		<ul
			ref={forwardRef}
			className={cn('flex', 'flex-row', 'items-center', 'gap-1', className)}
			{...rest}
		/>
	);
});
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<
	Types.PaginationItemElement,
	Types.PaginationItemProps
>((props, forwardRef) => {
	const { className, ...rest } = props;
	return <li ref={forwardRef} className={cn(className)} {...rest} />;
});
PaginationItem.displayName = 'PaginationItem';

const PaginationLink = React.forwardRef<
	Types.PaginationLinkElement,
	Types.PaginationLinkProps
>((props, forwardRef) => {
	const { href, isActive, className, children, ...rest } = props;
	return (
		<Button
			ref={forwardRef}
			className={cn(className)}
			aria-current={isActive ? 'page' : undefined}
			asChild
			{...rest}
		>
			<Link href={href}>{children}</Link>
		</Button>
	);
});
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = React.forwardRef<
	Types.PaginationPreviousElement,
	Types.PaginationPreviousProps
>((props, forwardRef) => {
	const { className, ...rest } = props;
	return (
		<PaginationLink
			ref={forwardRef}
			size='icon'
			className={cn(className)}
			aria-label='이전 페이지로 가기'
			{...rest}
		>
			<RxCaretLeft />
		</PaginationLink>
	);
});
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = React.forwardRef<
	Types.PaginationNextElement,
	Types.PaginationNextProps
>((props, forwardRef) => {
	const { className, ...rest } = props;
	return (
		<PaginationLink
			ref={forwardRef}
			size='icon'
			className={cn(className)}
			aria-label='다음 페이지로 가기'
			{...rest}
		>
			<RxCaretRight />
		</PaginationLink>
	);
});
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = React.forwardRef<
	Types.PaginationEllipsisElement,
	Types.PaginationEllipsisProps
>((props, forwardRef) => {
	const { className, ...rest } = props;
	return (
		<span ref={forwardRef} className={cn(className)} aria-hidden {...rest}>
			<RxDotsHorizontal />
		</span>
	);
});
PaginationEllipsis.displayName = 'PaginationEllipsis';

const Pagination = {
	Root: PaginationRoot,
	Content: PaginationContent,
	Ellipsis: PaginationEllipsis,
	Item: PaginationItem,
	Link: PaginationLink,
	Next: PaginationNext,
	Previous: PaginationPrevious,
};

export default Pagination;
