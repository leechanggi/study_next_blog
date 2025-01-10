'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { BsFiletypeJpg, BsFiletypePng, BsFiletypeGif, BsFiletypeSvg } from 'react-icons/bs';
import { RxCrossCircled } from 'react-icons/rx';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, Input, Button, ImageUpload, CardList, CardItem } from '@/components';
import ImagesSchema, { TImagesSchema } from '../images-schema';

const AdminImagesCreatePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [fileSrc, setFileSrc] = React.useState<FileList | null>(null);

  const form = useForm<z.infer<typeof ImagesSchema>>({
    resolver: zodResolver(ImagesSchema),
    defaultValues: {
      imgSrc: '',
    },
  });

  const onSubmit = async (data: TImagesSchema) => {
    const { imgSrc } = data;
    console.log(imgSrc);
  };

  React.useEffect(() => {
    console.log(fileSrc);
  }, [fileSrc]);

  return (
    <>
      <h2 className='text-xl font-medium mb-2'>이미지 업로드</h2>
      <Form.Root {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Form.Field
            name='imgSrc'
            render={({ field }) => {
              const { onChange, ...rest } = field;
              return (
                <Form.Item className='mt-4'>
                  <ImageUpload title='파일을 선택하거나 여기에 끌어다 놓으세요.' titleTag='h3' subTitle='JPG, PNG, GIF, SVG 형식, 최대 5MB' variant='outline'>
                    파일 선택
                  </ImageUpload>

                  <Form.Control>
                    <Input
                      type='file'
                      className='mt-2'
                      accept='image/jpg, image/png, image/gif, image/svg'
                      multiple
                      onChange={event => {
                        const selectedFile = event.target.files || null;
                        setFileSrc(selectedFile);
                        onChange(event);
                      }}
                      {...rest}
                    />
                  </Form.Control>

                  <CardList className='mt-8 space-y-2'>
                    <CardItem className='relative pl-5 flex items-center justify-start space-x-3'>
                      <BsFiletypeJpg size='2.5rem' />
                      <div className='flex flex-col items-start justify-start space-y-2'>
                        <span className='underline underline-offset-4'>my-cv.jpg</span>
                        <span className='text-sm text-zinc-600 dark:text-zinc-300'>120 KB</span>
                      </div>
                      <Button className='absolute !m-0 p-2 top-3 right-4' customStyleOnly>
                        <RxCrossCircled size='1.25rem' />
                        <span className='sr-only'>삭제</span>
                      </Button>
                    </CardItem>
                    <CardItem className='relative pl-5 flex items-center justify-start space-x-3'>
                      <BsFiletypePng size='2.5rem' />
                      <div className='flex flex-col items-start justify-start space-y-2'>
                        <span className='underline underline-offset-4'>my-cv.png</span>
                        <span className='text-sm text-zinc-600 dark:text-zinc-300'>120 KB</span>
                      </div>
                      <Button className='absolute !m-0 p-2 top-3 right-4' customStyleOnly>
                        <RxCrossCircled size='1.25rem' />
                        <span className='sr-only'>삭제</span>
                      </Button>
                    </CardItem>
                    <CardItem className='relative pl-5 flex items-center justify-start space-x-3'>
                      <BsFiletypeGif size='2.5rem' />
                      <div className='flex flex-col items-start justify-start space-y-2'>
                        <span className='underline underline-offset-4'>my-cv.png</span>
                        <span className='text-sm text-zinc-600 dark:text-zinc-300'>120 KB</span>
                      </div>
                      <Button className='absolute !m-0 p-2 top-3 right-4' customStyleOnly>
                        <RxCrossCircled size='1.25rem' />
                        <span className='sr-only'>삭제</span>
                      </Button>
                    </CardItem>
                    <CardItem className='relative pl-5 flex items-center justify-start space-x-3'>
                      <BsFiletypeSvg size='2.5rem' />
                      <div className='flex flex-col items-start justify-start space-y-2'>
                        <span className='underline underline-offset-4'>my-cv.png</span>
                        <span className='text-sm text-zinc-600 dark:text-zinc-300'>120 KB</span>
                      </div>
                      <Button className='absolute !m-0 p-2 top-3 right-4' customStyleOnly>
                        <RxCrossCircled size='1.25rem' />
                        <span className='sr-only'>삭제</span>
                      </Button>
                    </CardItem>
                  </CardList>
                  <Form.Message />
                </Form.Item>
              );
            }}
          />
          <Button type='submit' size='lg' className='w-full mt-8'>
            이미지 업로드
          </Button>
        </form>
      </Form.Root>
    </>
  );
};

export default AdminImagesCreatePage;
