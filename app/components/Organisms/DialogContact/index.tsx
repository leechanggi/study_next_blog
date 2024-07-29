'use client';

import React from 'react';
import emailjs from '@emailjs/browser';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, Dialog, Form, Input, Textarea } from '@components';

const DialogContact: React.FC = () => {
	const [open, setOpen] = React.useState<boolean>(false);
	const form = useForm({
		defaultValues: {
			user_name: '',
			user_email: '',
			message: '',
		},
	});

	const sendEmail = (data: any) => {
		if (data) {
			emailjs
				.send(
					process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
					process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
					data,
					{
						publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
					}
				)
				.then(
					() => {
						console.log('성공!');
					},
					error => {
						console.log(error);
					}
				);
		}
	};

	return (
		<Dialog
			trigger={<Button size='sm'>Contact ME</Button>}
			title='Contact ME'
			content={
				<Form.Root {...form}>
					<form onSubmit={form.handleSubmit(sendEmail)}>
						<Form.Field
							name='user_name'
							render={({ field }) => (
								<Form.Item>
									<Form.Label>Name</Form.Label>
									<Form.Control>
										<Input type='text' className='mt-1' {...field} />
									</Form.Control>
									<Form.Message />
								</Form.Item>
							)}
						/>
						<Form.Field
							name='user_email'
							render={({ field }) => (
								<Form.Item className='mt-4'>
									<Form.Label>Email</Form.Label>
									<Form.Control>
										<Input type='text' className='mt-1' {...field} />
									</Form.Control>
									<Form.Message />
								</Form.Item>
							)}
						/>
						<Form.Field
							name='message'
							render={({ field }) => (
								<Form.Item className='mt-4'>
									<Form.Label>Message</Form.Label>
									<Form.Control>
										<Textarea className='mt-1' {...field} />
									</Form.Control>
									<Form.Message />
								</Form.Item>
							)}
						/>
						<Button type='submit' className='w-full mt-4'>
							Send Message
						</Button>
					</form>
				</Form.Root>
			}
			open={open}
			onOpenChange={setOpen}
		/>
	);
};

export default DialogContact;
