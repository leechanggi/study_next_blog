'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { requestEmail, confirmEmail, signup, emailExists } from '@/lib';
import { Form, Input, Button, Dialog, InputOTP } from '@/components';
import SignupSchema, { TSignupSchema } from '@router/auth/signup/signup-schema';

const AuthSignupPage = () => {
	const [isOTPDialogOpen, setIsOTPDialogOpen] = React.useState<boolean>(false);
	const [OTPValue, setOTPValue] = React.useState<string>('');
	const [verifiedEmail, setVerifiedEmail] = React.useState<string>('');
	const [isEmailVerified, setIsEmailVerified] = React.useState<boolean>(false);

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

	React.useEffect(() => {
		if (OTPValue.length === 8) {
			const confirmEmailAsync = async () => {
				try {
					await confirmEmail({ email: emailValue, token: OTPValue });
					console.log('이메일 인증이 완료되었습니다.');
					setVerifiedEmail(emailValue);
					setIsEmailVerified(true);
					setIsOTPDialogOpen(false);
					setOTPValue('');
				} catch (error) {
					console.error('이메일 인증 실패:', error);
					setOTPValue('');
				}
			};

			confirmEmailAsync();
		}
	}, [OTPValue, emailValue]);

	const handleRequestEmail = async (email: string) => {
		try {
			const userExists = await emailExists(email);

			if (userExists) {
				console.log('이메일이 이미 등록되어 있습니다.');
				throw new Error('이메일이 이미 등록되어 있습니다.');
			}

			await requestEmail({ email });
			console.log('이메일 인증이 요청되었습니다.');
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error('Error:', error.message);
				throw new Error(error.message || '이메일 인증 요청에 실패했습니다.');
			} else {
				console.error('Unknown error occurred');
				throw new Error(
					'일시적인 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.'
				);
			}
		}
	};

	const onSubmit = async (data: TSignupSchema) => {
		if (!isEmailVerified) {
			console.log('이메일 인증을 완료해야 합니다.');
			form.setError(
				'email',
				{
					type: 'custom',
					message: '이메일 인증을 완료해야 합니다.',
				},
				{ shouldFocus: true }
			);
			return;
		}

		const authData = {
			email: verifiedEmail,
			password: data.password,
		};

		try {
			const newUser = await signup(authData.email, authData.password);
			console.log('User signed up successfully:', newUser);
		} catch (error) {
			console.error('Signup error:', error);
		}
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
												readOnly={isEmailVerified}
												{...rest}
											/>
										</Form.Control>

										<Dialog
											open={isOTPDialogOpen}
											onOpenChange={setIsOTPDialogOpen}
											trigger={
												<Button
													type='button'
													variant='secondary'
													className='shrink-0'
													onClick={_event => {
														emailValue && handleRequestEmail(emailValue);
													}}
													disabled={
														!emailValue || !!emailError || isEmailVerified
													}
												>
													{isEmailVerified ? '인증완료' : '인증'}
												</Button>
											}
											title='인증번호 입력'
											content={
												<>
													<p>
														이메일 주소로 전송된 인증번호 8자리를 입력하세요.
													</p>
													<div className='flex justify-center items-center mt-8'>
														<InputOTP.Root
															maxLength={8}
															value={OTPValue}
															onChange={setOTPValue}
														>
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
