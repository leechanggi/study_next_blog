'use client';

import React from 'react';
import Image from 'next/image';
import * as z from 'zod';
import { RxCross2 } from 'react-icons/rx';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { TPosts } from '@/service/post';
import { cn, supabaseClient, getPostById, updatePostById } from '@/lib';
import {
	Form,
	MarkdownEditor,
	Input,
	Button,
	Checkbox,
	Label,
	Dialog,
	ScrollArea,
} from '@/components';
import PostsSchema, { TPostSchema } from '@/(router)/admin/posts/posts-schema';

const AdminPostsUpdatePage = ({ params }: { params: { slug: string } }) => {
	const router = useRouter();
	const { slug: id } = params;
	const [post, setPost] = React.useState<TPosts | null>(null);
	const [tag, setTag] = React.useState<string>('');
	const [fileSrc, setFileSrc] = React.useState<File | null>(null);

	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);

	const form = useForm<z.infer<typeof PostsSchema>>({
		resolver: zodResolver(PostsSchema),
		defaultValues: {
			title: '',
			description: '',
			content: '',
			tags: '',
			imgSrc: '',
			skip: false,
		},
	});

	const tags = form.watch('tags');

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedPosts = await getPostById(parseInt(id), false, true);
				setPost(fetchedPosts);
			} catch (error) {
				console.error('Error fetching post:', error);
				setError('일시적인 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.');
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [id]);

	React.useEffect(() => {
		if (!post) return;
		form.reset({
			title: post.title,
			description: post.description,
			content: post.content,
			tags: post.tags || '',
			imgSrc: '',
			skip: post.skip,
		});
	}, [post, form]);

	const handleClickOfCopyUrl = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();
		if (!post?.imgSrc) return;
		navigator.clipboard
			.writeText(post?.imgSrc)
			.then(() => {
				alert('URL이 클립보드에 복사되었습니다.');
			})
			.catch(err => {
				console.error('URL 복사에 실패했습니다:', err);
			});
	};

	const handleUpdateTag = (tag: string) => {
		if (tag.length < 1) return;
		const updatedTags = tags ? `${tags},${tag}` : tag;
		form.setValue('tags', updatedTags);
		setTag('');
	};

	const handleDeleteTag = (tagToDelete: string) => {
		const updatedTags = tags
			.split(',')
			.filter((tag: string) => tag !== tagToDelete)
			.join(',');
		form.setValue('tags', updatedTags);
	};

	const handleFileChange = async (file: File) => {
		if (!file) return;
		const fileExt = file.name.split('.').pop();
		const fileName = `${Date.now()}.${fileExt}`;
		const filePath = `${fileName}`;
		const { error } = await supabaseClient.storage
			.from('public-images')
			.upload(filePath, file, {
				cacheControl: '3600',
				upsert: false,
			});
		if (error) {
			console.error('Error uploading file:', error);
			return;
		}
		const { data } = supabaseClient.storage
			.from('public-images')
			.getPublicUrl(filePath);
		return data.publicUrl;
	};

	const handleFileDelete = async (filePath: string) => {
		if (!filePath) return;
		const extractFilePath = (filePath: string) => {
			const startIndex =
				filePath.indexOf('public-images/') + 'public-images/'.length;
			return filePath.substring(startIndex);
		};
		const { error } = await supabaseClient.storage
			.from('public-images')
			.remove([extractFilePath(filePath)]);
		if (error) {
			console.error('Error removing file:', error.message);
			return false;
		}
		return true;
	};

	const onSubmit = async (data: TPostSchema) => {
		const { imgSrc, ...rest } = data;

		try {
			if (!fileSrc) {
				await updatePostById(parseInt(id), rest);
			} else {
				const publicUrl = await handleFileChange(fileSrc);

				if (!publicUrl) {
					console.error('Failed to upload the file.');
					return;
				}

				await updatePostById(parseInt(id), { imgSrc: publicUrl, ...rest });

				if (post?.imgSrc) {
					const deleteSuccess = await handleFileDelete(post.imgSrc);

					if (!deleteSuccess) {
						console.error('Failed to delete previous image. Aborting update.');
						return;
					}
				}
			}

			router.push('/admin/posts/update');
		} catch (error) {
			console.error('Error submitting the form:', error);
			alert('일시적인 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.');
		}
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	return (
		<>
			<h2 className='text-xl font-medium mb-2'>게시물 수정</h2>

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
							const { ref, value, onChange, ...rest } = field;
							return (
								<Form.Item className='mt-4'>
									<Form.Label>내용</Form.Label>
									<Form.Control>
										<MarkdownEditor
											ref={ref}
											value={post?.content}
											wrappedClassName='mt-1 h-80'
											onChange={value => onChange(value)}
											{...rest}
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
									<Label htmlFor='tag'>태그</Label>
									<Form.Control>
										<Input type='hidden' value={tags} {...rest} />
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
											onClick={event => {
												event.preventDefault();
												handleUpdateTag(tag);
											}}
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
							const { onChange, ...rest } = field;
							return (
								<Form.Item className='mt-4'>
									<Form.Label>대표 이미지</Form.Label>
									<div className='flex space-x-2 mt-1'>
										<div className='grow'>
											<Form.Control>
												<Input
													type='file'
													accept='image/jpeg, image/png, image/gif, image/webp'
													onChange={event => {
														const selectedFile =
															event.target.files?.[0] || null;
														setFileSrc(selectedFile);
														onChange(event);
													}}
													{...rest}
												/>
											</Form.Control>
										</div>
										<div className='shrink-0'>
											{post?.imgSrc && (
												<Dialog
													trigger={
														<Button variant='destructive'>
															수정 전 이미지보기
														</Button>
													}
													title='수정 전 이미지보기'
													content={
														<>
															<ScrollArea className='h-[261px]'>
																<Image
																	src={post?.imgSrc}
																	alt='수정 전 이미지보기'
																	width={0}
																	height={0}
																	className={cn('w-full', 'h-auto')}
																	priority
																	unoptimized
																/>
															</ScrollArea>

															<Label htmlFor='imgSrc' className='mt-4'>
																대표 이미지 URL
															</Label>
															<div className='flex items-center justify-between mt-1 space-x-2'>
																<Input
																	type='text'
																	id='imgSrc'
																	value={post?.imgSrc}
																	readOnly
																	disabled
																/>
																<Button
																	type='button'
																	variant='secondary'
																	className='shrink-0'
																	onClick={handleClickOfCopyUrl}
																>
																	URL복사
																</Button>
															</div>
														</>
													}
												/>
											)}
										</div>
									</div>
									<Form.Message />
								</Form.Item>
							);
						}}
					/>

					<Form.Field
						name='skip'
						render={({ field }) => {
							const { value, onChange, ...rest } = field;
							return (
								<Form.Item className='mt-4'>
									<div className='flex items-center'>
										<Form.Control>
											<Checkbox
												id='skip'
												checked={value}
												onCheckedChange={onChange}
												{...rest}
											/>
										</Form.Control>
										<Label htmlFor='skip' className='grow pl-2'>
											게시물 숨김
										</Label>
									</div>
									<Form.Message />
								</Form.Item>
							);
						}}
					/>

					<Button type='submit' size='lg' className='w-full mt-8'>
						게시물 수정
					</Button>
				</form>
			</Form.Root>
		</>
	);
};

export default AdminPostsUpdatePage;
