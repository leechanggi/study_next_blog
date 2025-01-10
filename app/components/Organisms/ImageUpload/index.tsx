import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { BsFillCloudArrowUpFill } from 'react-icons/bs';

import { cn } from '@/lib';
import { Button } from '@/components';
import * as Type from './type';

const ImageUpload = React.forwardRef<Type.ImageUploadElement, Type.ImageUploadProps>((props, forwardRef) => {
  const { title, subTitle, titleTag = 'h2', className, ...rest } = props;
  const Component = titleTag;

  return (
    <div
      className={cn(
        'w-full',
        'py-8',
        'px-4',
        'rounded-lg',
        'border-4',
        'border-dashed',
        'border-zinc-200',
        'text-center',
        'text-zinc-800',
        'overflow-hidden',
        'dark:border-zinc-700',
        'dark:text-zinc-100',
        className
      )}
    >
      <BsFillCloudArrowUpFill size='2.5rem' className='my-0 mx-auto' />
      <Component className={cn('mt-6', 'text-center', 'text-zinc-800', 'font-bold', 'dark:text-zinc-100')}>{title}</Component>
      <p className={cn('mt-2', 'text-center', 'text-zinc-800', 'dark:text-zinc-100')}>{subTitle}</p>
      <Button ref={forwardRef} className={cn('mt-2')} {...rest} />
    </div>
  );
});
ImageUpload.displayName = 'ImageUpload';

export default ImageUpload;
