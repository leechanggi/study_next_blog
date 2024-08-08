import React from 'react';

import { cn } from '@lib';
import * as Types from './type';

const TableRoot = React.forwardRef<
	Types.TableRootElement,
	Types.TableRootProps
>((props, ref) => {
	const { className, ...rest } = props;

	return (
		<div className='relative w-full overflow-auto'>
			<table
				ref={ref}
				className={cn('w-full', 'caption-bottom', 'text-sm', className)}
				{...rest}
			/>
		</div>
	);
});
TableRoot.displayName = 'TableRoot';

const TableHeader = React.forwardRef<
	Types.TableHeaderElement,
	Types.TableHeaderProps
>((props, ref) => {
	const { className, ...rest } = props;
	return (
		<thead ref={ref} className={cn('[&_tr]:border-b', className)} {...rest} />
	);
});
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
	Types.TableBodyElement,
	Types.TableBodyProps
>((props, ref) => {
	const { className, ...rest } = props;
	return (
		<tbody
			ref={ref}
			className={cn('[&_tr:last-child]:border-0', className)}
			{...rest}
		/>
	);
});
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
	Types.TableFooterElement,
	Types.TableFooterProps
>((props, ref) => {
	const { className, ...rest } = props;
	return (
		<tfoot
			ref={ref}
			className={cn(
				'border-t',
				'bg-muted/50',
				'font-medium',
				'[&>tr]:last:border-b-0',
				className
			)}
			{...rest}
		/>
	);
});
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<Types.TableRowElement, Types.TableRowProps>(
	(props, ref) => {
		const { className, ...rest } = props;
		return (
			<tr
				ref={ref}
				className={cn(
					'border-b',
					'transition-colors',
					'hover:bg-muted/50',
					className
				)}
				{...rest}
			/>
		);
	}
);
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
	Types.TableHeadElement,
	Types.TableHeadProps
>(({ className, ...props }, ref) => (
	<th
		ref={ref}
		className={cn(
			'h-12',
			'px-4',
			'text-left',
			'align-middle',
			'font-medium',
			'[&:has([role=checkbox])]:pr-0',
			className
		)}
		{...props}
	/>
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
	Types.TableCellElement,
	Types.TableCellProps
>(({ className, ...props }, ref) => (
	<td
		ref={ref}
		className={cn(
			'p-4',
			'align-middle',
			'[&:has([role=checkbox])]:pr-0',
			className
		)}
		{...props}
	/>
));
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
	Types.TableCaptionElement,
	Types.TableCaptionProps
>(({ className, ...props }, ref) => (
	<caption ref={ref} className={cn('mt-4', 'text-sm', className)} {...props} />
));
TableCaption.displayName = 'TableCaption';

const Table = {
	Root: TableRoot,
	Header: TableHeader,
	Body: TableBody,
	Footer: TableFooter,
	Head: TableHead,
	Row: TableRow,
	Cell: TableCell,
	Caption: TableCaption,
};

export default Table;
