'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button, Form, Input } from '@components';
import * as Type from './type';

const DialogSearch = () => {
	const router = useRouter();

	const schema = z.object({
		search: z.string(),
	});

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			search: '',
		},
	});

	const handleSearchSubmit = (data: Type.TSearch) => {
		data.search
			? data.search.startsWith('#')
				? router.push(`/?tag=${data.search.slice(1)}`)
				: router.push(`/?q=${data.search}`)
			: router.push('/');
	};

	return (
		<Form.Root {...form}>
			<form onSubmit={form.handleSubmit(handleSearchSubmit)}>
				<Form.Field
					name='search'
					render={({ field }) => {
						const { onBlur, ...rest } = field;
						return (
							<Form.Item>
								<div className='flex flex-row'>
									<Form.Label className='sr-only'>검색</Form.Label>

									<Form.Control>
										<Input
											className='flex-grow w-40'
											type='text'
											placeholder='검색어를 입력하세요.'
											required
											onBlur={form.handleSubmit(handleSearchSubmit)}
											{...rest}
										/>
									</Form.Control>

									<Button
										type='submit'
										variant='secondary'
										size='icon'
										className='flex-shrink-0 ml-2'
									>
										<RxMagnifyingGlass size='1.25em' />
										<span className='sr-only'>검색</span>
									</Button>
								</div>
							</Form.Item>
						);
					}}
				/>
			</form>
		</Form.Root>
	);
};

export default DialogSearch;
