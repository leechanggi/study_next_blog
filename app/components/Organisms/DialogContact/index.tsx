'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
	const [open, setOpen] = React.useState<boolean>(false);
	const [alertOpen, setAlertOpen] = React.useState<boolean>(false);

	const blockedWordsString =
		process.env.NEXT_PUBLIC_EMAILJS_BLOCKED_WORDS || '';
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
			.transform(val => val.trim())
			.refine(val => val.length >= 30 && val.length <= 300, {
				message: '최소 30자 이상, 최대 300자 이하로 입력해주세요.',
			}),
	});

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			user_name: '',
			user_email: '',
			message: '',
		},
	});

	const sendEmail = async (data: TEmail) => {
		try {
			const response = await fetch('/api/send-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				console.log('성공!');
				form.reset();
				setOpen(false);
			} else {
				console.log('이메일 전송 실패:', await response.json());
			}
		} catch (error) {
			console.log('이메일 전송 실패:', error);
		}
	};

	const handleSubmit = () => {
		setAlertOpen(true);
	};

	const handleConfirmSubmit = async () => {
		setAlertOpen(false);
		const formData = form.getValues();
		await sendEmail(formData);
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
						<form onSubmit={form.handleSubmit(handleSubmit)}>
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