'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';

import { Form, Input, Button } from '@/components';
import LoginSchema, { TLoginSchema } from '@router/auth/login/login-schema';
import Link from 'next/link';

const AuthLoginPage = () => {
	const router = useRouter();

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: TLoginSchema) => {
		try {
			const result = await signIn('credentials', {
				redirect: false,
				email: data.email,
				password: data.password,
			});

			if (result?.error) {
				console.error('Login failed:', result.error);
			} else if (result?.ok) {
				router.push('/admin');
			}
		} catch (error) {
			console.error('An unexpected error occurred:', error);
		}
	};

	return (
		<>
			<h2 className='text-center text-xl font-medium mb-2'>관리자 로그인</h2>

			<p className='text-center break-keep'>
				본 서비스는 관리 목적으로만 제공되며, 관리자 전용 로그인 페이지입니다.
				<br />
				일반 사용자도 회원가입이 가능하지만, 권한은 제한됩니다. 또한 본 서비스는
				어떠한 개인정보도 수집하지 않습니다.
			</p>

			<Form.Root {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<Form.Field
						name='email'
						render={({ field }) => (
							<Form.Item className='mt-4'>
								<Form.Label>이메일 주소</Form.Label>
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

					<Button variant='link' size='sm' className='px-1' asChild>
						<Link href='/'>비밀번호를 잊으셨나요?</Link>
					</Button>

					<Button type='submit' size='lg' className='w-full mt-8'>
						이메일로 로그인
					</Button>

					<Button variant='secondary' size='lg' className='w-full mt-2' asChild>
						<Link href='/auth/signup'>관리자 회원가입</Link>
					</Button>
				</form>
			</Form.Root>
		</>
	);
};

export default AuthLoginPage;
