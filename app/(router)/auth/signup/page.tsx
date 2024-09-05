'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { sendVerificationEmail } from '@/lib';
import { Form, Input, Button, Dialog, InputOTP } from '@/components';
import SignupSchema, { TSignupSchema } from '@router/auth/signup/signup-schema';

const AuthSignupPage = () => {
	const form = useForm<z.infer<typeof SignupSchema>>({
		resolver: zodResolver(SignupSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const emailValue = form.watch('email');
	const emailError = form.formState.errors.email;

	const handleVerificationEmail = async (email: string) => {
		try {
			await sendVerificationEmail({ email });
			console.log('이메일 인증이 요청되었습니다.');
		} catch (error) {
			console.error('error', error);
		}
	};

	const onSubmit = async (data: TSignupSchema) => {
		// console.log(data);
	};

	return (
		<>
			<h2 className='text-center text-xl font-medium mb-2'>관리자 회원가입</h2>

			<p className='text-center break-keep'>
				본 서비스는 회원가입 과정에서 어떠한 개인정보도 수집하지 않습니다.
			</p>

			<Form.Root {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<Form.Field
						name='email'
						render={({ field }) => {
							const { onBlur, onChange, ...rest } = field;
							return (
								<Form.Item className='mt-4'>
									<Form.Label>이메일 주소</Form.Label>
									<div className='flex mt-1 space-x-2'>
										<Form.Control>
											<Input
												type='text'
												className='grow'
												autoComplete='email'
												onChange={(
													event: React.ChangeEvent<HTMLInputElement>
												) => {
													onChange(event);
													form.trigger('email');
												}}
												onBlur={(
													_event: React.FocusEvent<HTMLInputElement, Element>
												) => {
													onBlur();
													form.trigger('email');
												}}
												{...rest}
											/>
										</Form.Control>

										{/* <Button
											type='button'
											variant='secondary'
											className='shrink-0'
											onClick={_event => handleVerificationEmail(emailValue)}
											disabled={!!emailError}
										>
											인증
										</Button> */}

										<Dialog
											trigger={
												<Button
													type='button'
													variant='secondary'
													className='shrink-0'
													onClick={_event =>
														handleVerificationEmail(emailValue)
													}
													disabled={!!emailError}
												>
													인증
												</Button>
											}
											title='인증번호 입력'
											content={
												<>
													<p>
														이메일 주소로 전송된 인증번호 8자리를 입력하세요.
													</p>
													<div className='flex justify-center items-center mt-8'>
														<InputOTP.Root maxLength={8}>
															<InputOTP.Group>
																<InputOTP.Slot index={0} />
																<InputOTP.Slot index={1} />
																<InputOTP.Slot index={2} />
																<InputOTP.Slot index={3} />
															</InputOTP.Group>
															<InputOTP.Separator />
															<InputOTP.Group>
																<InputOTP.Slot index={4} />
																<InputOTP.Slot index={5} />
																<InputOTP.Slot index={6} />
																<InputOTP.Slot index={7} />
															</InputOTP.Group>
														</InputOTP.Root>
													</div>

													<Button size='lg' className='w-full mt-8'>
														인증번호 재전송
													</Button>
												</>
											}
										/>
									</div>
									<Form.Message />
								</Form.Item>
							);
						}}
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

					<Form.Field
						name='confirmPassword'
						render={({ field }) => (
							<Form.Item className='mt-4'>
								<Form.Label>비밀번호 확인</Form.Label>
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
						회원가입
					</Button>
				</form>
			</Form.Root>
		</>
	);
};

export default AuthSignupPage;
