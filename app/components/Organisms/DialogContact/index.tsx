'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';

import {
	AlertDialog,
	Button,
	Dialog,
	Form,
	Input,
	Textarea,
} from '@components';
import { TEmail } from '@service/sendEmail';

const DialogContact = () => {
	const { data: session } = useSession();
	const [open, setOpen] = React.useState<boolean>(false);
	const [alertOpen, setAlertOpen] = React.useState<boolean>(false);
	const [_toastMessage, setToastMessage] = React.useState<string | null>(null);

	const blockedWordsString = process.env.NEXT_PUBLIC_BLOCKED_WORDS || '';
	const blockedWords = blockedWordsString
		.replace(/'/g, '')
		.split(',')
		.map(word => word.trim());

	const schema = z.object({
		user_name: z
			.string()
			.min(2, { message: '최소 2글자 이상 입력하세요.' })
			.max(16, { message: '최대 16글자 까지 입력가능합니다.' })
			.regex(
				/^[a-zA-Z가-힣]+(?: [a-zA-Z가-힣]+)?$/,
				'올바른 형식의 이름이 아닙니다.'
			)
			.refine(val => !blockedWords.some(word => val.includes(word)), {
				message: '부적절한 단어가 포함되어 있습니다.',
			}),
		user_email: z
			.string()
			.email('올바른 형식의 이메일이 아닙니다.')
			.regex(
				/^[a-zA-Z0-9._%+-]+@(naver\.com|daum\.net|hanmail\.net|hotmail\.com|gmail\.com|nate\.com|yahoo\.com)$/,
				'지원하는 형식의 도메인 주소가 아닙니다.'
			),
		message: z
			.string()
			.refine(val => !blockedWords.some(word => val.includes(word)), {
				message: '부적절한 단어가 포함되어 있습니다.',
			})
			.refine(val => !/[;&|<>(){}[\]$!\\"]/g.test(val), {
				message: '특수문자는 사용할 수 없습니다.',
			})
			.transform(val => val.trim())
			.refine(val => val.length >= 30 && val.length <= 300, {
				message: '최소 30자 이상, 최대 300자 이하로 입력해주세요.',
			}),
		session_name: z.string(),
		session_email: z.string(),
	});

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			user_name: session ? session.user.name : '',
			user_email: session ? session.user.email : '',
			message: '',
			session_name: session ? session.user.name : '',
			session_email: session ? session.user.email : '',
		},
	});

	const handleConfirmSubmit = async (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();

		const formData = form.getValues();
		await sendEmail(formData);
	};

	const sendEmail = (formData: TEmail) => {
		const url = '/api/send-email';
		const headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		};

		axios
			.post(url, formData, { headers })
			.then(_response => {
				setToastMessage('이메일이 성공적으로 전송되었습니다.');

				form.reset();
				setOpen(false);
			})
			.catch(error => {
				setToastMessage('이메일 전송에 실패했습니다.');
				console.error('Error:', error);
			})
			.finally(() => {
				setAlertOpen(false);
			});
	};

	return (
		<>
			<Dialog
				trigger={<Button>이메일 보내기</Button>}
				open={open}
				onOpenChange={val => {
					setOpen(val);
					form.reset();
				}}
				title='이메일 보내기'
				content={
					<Form.Root {...form}>
						<form
							onSubmit={form.handleSubmit(() => {
								setAlertOpen(true);
							})}
						>
							<Form.Field
								name='user_name'
								render={({ field }) => (
									<Form.Item className='mt-4'>
										<Form.Label>보내시는 분의 이름</Form.Label>
										<Form.Control>
											<Input
												type='text'
												className='mt-1'
												placeholder='이름을 입력해주세요. (2~16자, 특수문자 제외)'
												{...field}
											/>
										</Form.Control>
										<Form.Message />
									</Form.Item>
								)}
							/>
							<Form.Field
								name='user_email'
								render={({ field }) => (
									<Form.Item className='mt-4'>
										<Form.Label>보내시는 분의 이메일</Form.Label>
										<Form.Control>
											<Input
												type='text'
												className='mt-1'
												placeholder='이메일을 정확히 입력해주세요.'
												{...field}
											/>
										</Form.Control>
										<Form.Message />
									</Form.Item>
								)}
							/>
							<Form.Field
								name='message'
								render={({ field }) => (
									<Form.Item className='mt-4'>
										<Form.Label>전하고 싶은 말</Form.Label>
										<Form.Control>
											<Textarea
												className='mt-1'
												placeholder='내용을 입력해주세요. (30~300자)'
												{...field}
											/>
										</Form.Control>
										<Form.Message />
									</Form.Item>
								)}
							/>
							<div className='mt-8 -mx-6 -mb-4 w-dialogFooterWidth'>
								<Button type='submit' size='lg' className='w-full rounded-none'>
									이메일 보내기
								</Button>
							</div>
						</form>
					</Form.Root>
				}
			/>
			<AlertDialog
				open={alertOpen}
				onOpenChange={setAlertOpen}
				viewOverlay={false}
				title='이메일 보내기 확인'
				content={
					<p className='mt-4 break-keep'>
						소중한 의견 감사합니다. 제출 버튼을 누르면 이메일이 전송됩니다.
						입력하신 내용이 맞는지 다시 한 번 확인해주세요.
					</p>
				}
				cancel={
					<Button
						type='button'
						variant='outline'
						onClick={() => setAlertOpen(false)}
					>
						다시 확인하기
					</Button>
				}
				action={
					<Button type='button' className='ml-2' onClick={handleConfirmSubmit}>
						제출
					</Button>
				}
			/>
		</>
	);
};

export default DialogContact;
