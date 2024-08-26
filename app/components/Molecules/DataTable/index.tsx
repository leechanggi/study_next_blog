'use client';

import React from 'react';
import {
	useReactTable,
	flexRender,
	getCoreRowModel,
	Cell,
} from '@tanstack/react-table';

import { cn } from '@/lib';
import { Table } from '@/components';
import * as Types from './type';

const DataTable = <TData, TValue>({
	columns,
	data,
	options,
}: Types.DataTableProps<TData, TValue>) => {
	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		...options,
	});

	const renderEllipsis = (cell: Cell<TData, unknown>) => {
		const ellipsis = cell.column.columnDef.meta?.rows?.ellipsis;
		const ellipsisClassName =
			cell.column.columnDef.meta?.rows?.ellipsisClassName;

		if (!ellipsis) {
			return flexRender(cell.column.columnDef.cell, cell.getContext());
		}

		return (
			<span className={cn(ellipsisClassName, `ellipsis-${ellipsis}`)}>
				{flexRender(cell.column.columnDef.cell, cell.getContext())}
			</span>
		);
	};

	return (
		<div className='rounded-md border'>
			<Table.Root>
				<Table.Header>
					{table.getHeaderGroups().map(headerGroup => (
						<Table.Row key={headerGroup.id}>
							{headerGroup.headers.map(header => {
								return (
									<Table.Head
										key={header.id}
										className={cn(
											header.column.columnDef.meta?.headerGroup?.className
										)}
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
											  )}
									</Table.Head>
								);
							})}
						</Table.Row>
					))}
				</Table.Header>

				<Table.Body>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map(row => (
							<Table.Row key={row.id}>
								{row.getVisibleCells().map(cell => (
									<Table.Cell
										key={cell.id}
										className={cn(cell.column.columnDef.meta?.rows?.className)}
									>
										{renderEllipsis(cell)}
									</Table.Cell>
								))}
							</Table.Row>
						))
					) : (
						<Table.Row>
							<Table.Cell colSpan={columns.length} className='h-24 text-center'>
								조회된 결과값이 없습니다.
							</Table.Cell>
						</Table.Row>
					)}
				</Table.Body>
			</Table.Root>
		</div>
	);
};

export default DataTable;
