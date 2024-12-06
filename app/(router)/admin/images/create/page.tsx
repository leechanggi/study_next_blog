'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, Input, Button } from '@/components';
import ImagesSchema, { TImagesSchema } from '../images-schema';

const AdminImagesCreatePage = () => {
	const router = useRouter();
	const { data: session } = useSession();
	const [fileSrc, setFileSrc] = React.useState<File[]>([]);

	const form = useForm<z.infer<typeof ImagesSchema>>({
		resolver: zodResolver(ImagesSchema),
		defaultValues: {
			imgSrc: '',
		},
	});

	const onSubmit = async (data: TImagesSchema) => {
		const { imgSrc } = data;
		console.log(imgSrc);
	};

	return (
		<>
			<h2 className='text-xl font-medium mb-2'>이미지 업로드</h2>
			<Form.Root {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<Form.Field
						name='imgSrc'
						render={({ field }) => {
							const { value, ...rest } = field;
							return (
								<Form.Item className='mt-4'>
									{/* <Form.Label>대표 이미지</Form.Label> */}
									<Form.Control>
										<Input type='hidden' value={'@TEMP'} {...rest} />
									</Form.Control>
									{/* <Input
										type='file'
										className='mt-1'
										accept='image/jpeg, image/png, image/gif, image/webp'
										onChange={event => {
											const selectedFile = event.target.files?.[0] || null;
											setFileSrc(selectedFile);
											onChange(event);
										}}
										{...rest}
									/> */}
									<Form.Message />
								</Form.Item>
							);
						}}
					/>
					<Button type='submit' size='lg' className='w-full mt-8'>
						이미지 업로드
					</Button>
				</form>
			</Form.Root>
		</>
	);
};

export default AdminImagesCreatePage;
