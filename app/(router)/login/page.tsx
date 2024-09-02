'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, Input, Button } from '@/components';
import LoginSchema, { TLoginSchema } from '@/(router)/login/login-schema';

const LoginPage = () => {
	const router = useRouter();

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	// const email = form.watch('email');
	// const password = form.watch('password');

	const onSubmit = async (data: TLoginSchema) => {
		console.log(data);
		// try {
		// 	router.push('/admin');
		// } catch (error) {
		// 	console.error(error);
		// }
	};

	return (
		<>
			<h2 className='text-xl font-medium mb-2'>관리자 로그인</h2>

			<Form.Root {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<Form.Field
						name='email'
						render={({ field }) => (
							<Form.Item className='mt-4'>
								<Form.Label>이메일</Form.Label>
								<Form.Control>
									<Input
										type='text'
										className='mt-1'
										autoComplete='email'
										{...field}
									/>
								</Form.Control>
								<Form.Message />
							</Form.Item>
						)}
					/>

					<Form.Field
						name='password'
						render={({ field }) => (
							<Form.Item className='mt-4'>
								<Form.Label>비밀번호</Form.Label>
								<Form.Control>
									<Input
										type='password'
										className='mt-1'
										autoComplete='current-password'
										{...field}
									/>
								</Form.Control>
								<Form.Message />
							</Form.Item>
						)}
					/>

					<Button type='submit' size='lg' className='w-full mt-8'>
						로그인
					</Button>
				</form>
			</Form.Root>
		</>
	);
};

export default LoginPage;
