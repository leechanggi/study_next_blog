'use client';

import React from 'react';

import { Table } from '@/components';
import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table';

import * as Types from './type';

const DataTable = <TData, TValue>({
	columns,
	data,
	isPagination = false,
}: Types.DataTableProps<TData, TValue>) => {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: isPagination ? getPaginationRowModel() : undefined,
	});

	return (
		<div className='rounded-md border'>
			<Table.Root>
				<Table.Header>
					{table.getHeaderGroups().map(headerGroup => (
						<Table.Row key={headerGroup.id}>
							{headerGroup.headers.map(header => {
								return (
									<Table.Head key={header.id}>
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
									<Table.Cell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
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
