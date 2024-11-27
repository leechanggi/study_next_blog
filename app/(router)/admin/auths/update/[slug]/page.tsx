'use client';

import React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn, getUserById, updateUserById } from '@/lib';
import { TUserTable } from '@/service/user';
import { Form, Input, Button, Checkbox, Label, Select } from '@/components';
import AuthsSchema, { TAuthsSchema } from '@/(router)/admin/auths/auths-schema';

const AdminAuthsUpdateSlugPage = ({ params }: { params: { slug: string } }) => {
	const router = useRouter();
	const { slug: id } = params;
	const [user, setUser] = React.useState<Partial<TUserTable>>();

	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);

	const form = useForm<z.infer<typeof AuthsSchema>>({
		resolver: zodResolver(AuthsSchema),
		defaultValues: {
			id: '',
			email: '',
			role: 'user',
			postPermissions: {
				create: false,
				read: false,
				update: false,
				delete: false,
			},
			userPermissions: {
				create: false,
				read: false,
				update: false,
				delete: false,
			},
		},
	});

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedUser = await getUserById(id);
				const userTableData: Partial<TUserTable> = {
					id: fetchedUser.id,
					email: fetchedUser.email,
					role: fetchedUser.role,
					postPermissions: fetchedUser.permissions.managePost,
					userPermissions: fetchedUser.permissions.manageUser,
				};

				setUser(userTableData);
			} catch (err) {
				setError('일시적인 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [id]);

	React.useEffect(() => {
		if (!user) return;
		form.reset({
			id: user.id,
			email: user.email,
			role: user.role,
			postPermissions: user.postPermissions,
			userPermissions: user.userPermissions,
		});
	}, [user, form]);

	const onSubmit = async (data: TAuthsSchema) => {
		const { id: _id, postPermissions: managePost, userPermissions: manageUser, ...rest } = data;
		try {
			await updateUserById(id, { permissions: { manageUser, managePost }, ...rest });

			router.push('/admin/auths/update');
		} catch (error) {
			console.error('Error submitting the form:', error);
			alert('일시적인 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.');
		}
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	return (
		<>
			<h2 className='text-xl font-medium mb-2'>사용자 권한 수정</h2>
			<Form.Root {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<Form.Field
						name='id'
						render={({ field }) => {
							const { onChange, onBlur, disabled, ...rest } = field;
							return (
								<Form.Item className='mt-4'>
									<Form.Label>사용자 고유 ID</Form.Label>
									<Form.Control>
										<Input type='text' className='mt-1' placeholder='사용자 고유 ID' readOnly disabled {...rest} />
									</Form.Control>
									<Form.Message />
								</Form.Item>
							);
						}}
					/>

					<Form.Field
						name='role'
						render={({ field }) => {
							const { onChange, value, ref, ...rest } = field;
							return (
								<Form.Item className='mt-4'>
									<Form.Label>사용자 분류</Form.Label>
									<Form.Control>
										<Select.Root onValueChange={onChange} defaultValue={value} value={value} {...rest}>
											<Select.Trigger ref={ref}>
												<Select.Value placeholder='사용자 분류' />
											</Select.Trigger>
											<Select.Content>
												<Select.Item value='admin'>관리자</Select.Item>
												<Select.Item value='user'>사용자</Select.Item>
											</Select.Content>
										</Select.Root>
									</Form.Control>
									<Form.Message />
								</Form.Item>
							);
						}}
					/>

					<Form.Field
						name='postPermissions'
						render={({ field }) => {
							const { onChange, value, disabled } = field;
							const post = value as TAuthsSchema['postPermissions'];
							return (
								<Form.Item className='mt-4'>
									<span className={cn('block', 'w-full', 'text-sm', 'font-medium')}>게시물 권한</span>
									<Form.Control>
										<>
											<div className={cn('flex', 'items-center', 'mt-2')}>
												<div className={cn('flex', 'items-center')}>
													<Label htmlFor='postPermissionsCreate'>create</Label>
													<Checkbox
														className={cn('ml-2')}
														id='postPermissionsCreate'
														defaultChecked={post.create}
														checked={post.create}
														disabled={disabled}
														onCheckedChange={checked => {
															onChange({ ...post, create: checked });
														}}
													/>
												</div>
												<div className={cn('flex', 'items-center', 'ml-4')}>
													<Label htmlFor='postPermissionsRead'>read</Label>
													<Checkbox
														className={cn('ml-2')}
														id='postPermissionsRead'
														defaultChecked={post.read}
														checked={post.read}
														disabled={disabled}
														onCheckedChange={checked => {
															onChange({ ...post, read: checked });
														}}
													/>
												</div>
												<div className={cn('flex', 'items-center', 'ml-4')}>
													<Label htmlFor='postPermissionsUpdate'>update</Label>
													<Checkbox
														className={cn('ml-2')}
														id='postPermissionsUpdate'
														defaultChecked={post.update}
														checked={post.update}
														disabled={disabled}
														onCheckedChange={checked => {
															onChange({ ...post, update: checked });
														}}
													/>
												</div>
												<div className={cn('flex', 'items-center', 'ml-4')}>
													<Label htmlFor='postPermissionsDelete'>delete</Label>
													<Checkbox
														className={cn('ml-2')}
														id='postPermissionsDelete'
														defaultChecked={post.delete}
														checked={post.delete}
														disabled={disabled}
														onCheckedChange={checked => {
															onChange({ ...post, delete: checked });
														}}
													/>
												</div>
											</div>
										</>
									</Form.Control>
									<Form.Message />
								</Form.Item>
							);
						}}
					/>

					<Form.Field
						name='userPermissions'
						render={({ field }) => {
							const { onChange, value, disabled } = field;
							const user = value as TAuthsSchema['userPermissions'];
							return (
								<Form.Item className='mt-4'>
									<span className={cn('block', 'w-full', 'text-sm', 'font-medium')}>관리자 권한</span>
									<Form.Control>
										<>
											<div className={cn('flex', 'items-center', 'mt-2')}>
												<div className={cn('flex', 'items-center')}>
													<Label htmlFor='userPermissionsCreate'>create</Label>
													<Checkbox
														className={cn('ml-2')}
														id='userPermissionsCreate'
														defaultChecked={user.create}
														checked={user.create}
														disabled={disabled}
														onCheckedChange={checked => {
															onChange({ ...user, create: checked });
														}}
													/>
												</div>
												<div className={cn('flex', 'items-center', 'ml-4')}>
													<Label htmlFor='userPermissionsRead'>read</Label>
													<Checkbox
														className={cn('ml-2')}
														id='userPermissionsRead'
														defaultChecked={user.read}
														checked={user.read}
														disabled={disabled}
														onCheckedChange={checked => {
															onChange({ ...user, read: checked });
														}}
													/>
												</div>
												<div className={cn('flex', 'items-center', 'ml-4')}>
													<Label htmlFor='userPermissionsUpdate'>update</Label>
													<Checkbox
														className={cn('ml-2')}
														id='userPermissionsUpdate'
														defaultChecked={user.update}
														checked={user.update}
														disabled={disabled}
														onCheckedChange={checked => {
															onChange({ ...user, update: checked });
														}}
													/>
												</div>
												<div className={cn('flex', 'items-center', 'ml-4')}>
													<Label htmlFor='userPermissionsDelete'>delete</Label>
													<Checkbox
														className={cn('ml-2')}
														id='userPermissionsDelete'
														defaultChecked={user.delete}
														checked={user.delete}
														disabled={disabled}
														onCheckedChange={checked => {
															onChange({ ...user, delete: checked });
														}}
													/>
												</div>
											</div>
										</>
									</Form.Control>
									<Form.Message />
								</Form.Item>
							);
						}}
					/>

					<Button type='submit' size='lg' className='w-full mt-8'>
						사용자 권한 수정
					</Button>
				</form>
			</Form.Root>
		</>
	);
};

export default AdminAuthsUpdateSlugPage;
