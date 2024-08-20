'use client';

import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';

import { Form, MarkdownEditor, Input, Button } from '@/components';

const blockedWordsString = process.env.NEXT_PUBLIC_BLOCKED_WORDS || '';

const blockedWords = blockedWordsString
	.replace(/'/g, '')
	.split(',')
	.map(word => word.trim());

const AdminPostsCreate = () => {
	const [tag, setTag] = React.useState<string>('');
	const [tags, setTags] = React.useState<string>('');
	const [imgSrc, setImgSrc] = React.useState<string>('');

	const schema = z.object({
		title: z
			.string()
			.min(2, { message: '최소 2글자 이상 입력하세요.' })
			.max(16, { message: '최대 16글자 까지 입력가능합니다.' })
			.refine(val => !blockedWords.some(word => val.includes(word)), {
				message: '부적절한 단어가 포함되어 있습니다.',
			}),
		description: z
			.string()
			.min(2, { message: '최소 2글자 이상 입력하세요.' })
			.max(16, { message: '최대 16글자 까지 입력가능합니다.' })
			.refine(val => !blockedWords.some(word => val.includes(word)), {
				message: '부적절한 단어가 포함되어 있습니다.',
			}),
		content: z
			.string()
			.min(2, { message: '최소 2글자 이상 입력하세요.' })
			.max(3000, { message: '최대 3000글자 까지 입력가능합니다.' })
			.refine(val => !blockedWords.some(word => val.includes(word)), {
				message: '부적절한 단어가 포함되어 있습니다.',
			}),
		tags: z.string(),
		imgSrc: z.string(),
		skip: z.boolean(),
	});

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			title: '',
			description: '',
			content: '',
			tags: '',
			imgSrc: '',
			skip: false,
		},
	});

	const handleUpdateTag = (tag: string) => {
		setTags(prev => {
			const tagArray = prev.split(',').filter(Boolean);
			if (!tagArray.includes(tag)) {
				tagArray.push(tag);
				setTag('');
			}
			return tagArray.join(',');
		});
	};

	const handleDeleteTag = (tag: string) => {
		setTags(prev => {
			const updatedTags = prev
				.split(',')
				.filter(t => t !== tag && t.trim() !== '');
			return updatedTags.join(',');
		});
	};

	const onSubmit = (data: any) => console.log(data);

	return (
		<div>
			<h2 className='text-xl font-medium mb-2'>게시물 생성</h2>

			<Form.Root {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<Form.Field
						name='title'
						render={({ field }) => (
							<Form.Item className='mt-4'>
								<Form.Label>제목</Form.Label>
								<Form.Control>
									<Input
										type='text'
										className='mt-1'
										placeholder='게시물의 제목을 입력하세요. (2~16자)'
										{...field}
									/>
								</Form.Control>
								<Form.Message />
							</Form.Item>
						)}
					/>

					<Form.Field
						name='description'
						render={({ field }) => (
							<Form.Item className='mt-4'>
								<Form.Label>설명</Form.Label>
								<Form.Control>
									<Input
										type='text'
										className='mt-1'
										placeholder='게시물의 설명을 입력하세요. (2~16자)'
										{...field}
									/>
								</Form.Control>
								<Form.Message />
							</Form.Item>
						)}
					/>

					<Form.Field
						name='content'
						render={({ field }) => {
							const { ref, name, value, onBlur, onChange } = field;
							return (
								<Form.Item className='mt-4'>
									<Form.Label>내용</Form.Label>
									<Form.Control>
										<MarkdownEditor
											ref={ref}
											value={value}
											name={name}
											wrappedClassName='mt-1 h-80'
											onChange={value => onChange(value)}
											onBlur={() => onBlur()}
										/>
									</Form.Control>
									<Form.Message />
								</Form.Item>
							);
						}}
					/>

					<Form.Field
						name='tags'
						render={({ field }) => {
							const { value, ...rest } = field;
							return (
								<Form.Item className='mt-4'>
									<Form.Label htmlFor='tag'>태그</Form.Label>
									<Form.Control>
										<Input
											type='hidden'
											className='mt-1'
											value={tags}
											tabIndex={-1}
											{...rest}
										/>
									</Form.Control>

									<div className='flex items-center justify-between mt-1 space-x-2'>
										<Input
											type='text'
											id='tag'
											value={tag}
											onChange={event => setTag(event.target.value)}
											placeholder='추가할 태그를 입력하세요.'
										/>
										<Button
											type='button'
											variant='secondary'
											className='shrink-0'
											onClick={_event => handleUpdateTag(tag)}
										>
											등록
										</Button>
									</div>

									{tags && (
										<div className='flex flex-wrap items-center justify-start -ml-2'>
											{tags
												.split(',')
												.filter(Boolean)
												.map((tag, index) => {
													return (
														<Button
															key={index}
															type='button'
															variant='outline'
															size='sm'
															className='rounded-full mt-2 ml-2'
															onClick={() => handleDeleteTag(tag)}
														>
															<span>{tag}</span>
															<RxCross2 size='1rem' className='pl-1' />
														</Button>
													);
												})}
										</div>
									)}
									<Form.Message />
								</Form.Item>
							);
						}}
					/>

					<Form.Field
						name='imgSrc'
						render={({ field }) => {
							const { value, onChange, ...rest } = field;
							return (
								<Form.Item className='mt-4'>
									<Form.Label>대표 이미지</Form.Label>
									<Form.Control>
										<Input
											type='file'
											className='mt-1'
											value={imgSrc}
											onChange={event => {
												console.log(event);
												setImgSrc(event.target.value);
											}}
											accept='image/jpeg, image/png, image/gif, image/webp'
											{...rest}
										/>
									</Form.Control>
									<Form.Message />
								</Form.Item>
							);
						}}
					/>

					<Button type='submit' size='lg' className='w-full mt-8'>
						게시물 생성
					</Button>
				</form>
			</Form.Root>
		</div>
	);
};

export default AdminPostsCreate;
