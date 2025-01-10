'use client';

import React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { RxCross2 } from 'react-icons/rx';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';

import { createPost } from '@/lib';
import supabase from '@supabaseClient';
import PostsSchema, { TPostSchema } from '@/(router)/admin/posts/posts-schema';
import { Form, MarkdownEditor, Input, Button, Checkbox, Label } from '@/components';

const AdminPostsCreatePage = () => {
  const [isClient, setIsClient] = React.useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const [tag, setTag] = React.useState<string>('');
  const [fileSrc, setFileSrc] = React.useState<File | null>(null);

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
    let { error } = await supabase.storage.from('public-images').upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });
    if (error) {
      console.error('Error uploading file:', error);
      return;
    }
    const { data } = supabase.storage.from('public-images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const onSubmit = async (data: TPostSchema) => {
    const { imgSrc, ...rest } = data;
    if (!fileSrc) {
      form.setError('imgSrc', {
        type: 'manual',
        message: '대표 이미지는 필수 값입니다.',
      });
      console.error('No file selected for upload.');
      return;
    }

    try {
      const publicUrl = await handleFileChange(fileSrc);
      const authorId = await session?.user.id;
      if (!publicUrl || !authorId) {
        console.error('Failed to upload the file.');
        return;
      }
      await createPost({ imgSrc: publicUrl, authorId, ...rest });
      router.push('/admin/posts');
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('일시적인 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.');
    }
  };

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <h2 className='text-xl font-medium mb-2'>게시물 생성</h2>
      <Form.Root {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Form.Field
            name='title'
            render={({ field }) => (
              <Form.Item className='mt-4'>
                <Form.Label>제목</Form.Label>
                <Form.Control>
                  <Input type='text' className='mt-1' placeholder='게시물의 제목을 입력하세요. (2~16자)' {...field} />
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
                  <Input type='text' className='mt-1' placeholder='게시물의 설명을 입력하세요. (2~16자)' {...field} />
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
                    <MarkdownEditor ref={ref} value={value} wrappedClassName='mt-1 h-80' onChange={value => onChange(value)} {...rest} />
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
                    <Input type='text' id='tag' value={tag} onChange={event => setTag(event.target.value)} placeholder='추가할 태그를 입력하세요.' />
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
                            <Button key={index} type='button' variant='outline' size='sm' className='rounded-full mt-2 ml-2' onClick={() => handleDeleteTag(tag)}>
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
                  <Form.Control>
                    <Input
                      type='file'
                      className='mt-1'
                      accept='image/jpeg, image/png, image/gif, image/webp'
                      onChange={event => {
                        const selectedFile = event.target.files?.[0] || null;
                        setFileSrc(selectedFile);
                        onChange(event);
                      }}
                      {...rest}
                    />
                  </Form.Control>
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
                      <Checkbox id='skip' checked={value} onCheckedChange={onChange} {...rest} />
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
            게시물 생성
          </Button>
        </form>
      </Form.Root>
    </>
  );
};

export default AdminPostsCreatePage;
