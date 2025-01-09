'use client';

import React from 'react';

import * as Types from './type';
import { cn } from '@/lib';

const CardItem = React.forwardRef<Types.CardItemElement, Types.CardItemProps>((props, forwardRef) => {
  const { className, ...rest } = props;

  return (
    <li
      ref={forwardRef}
      className={cn('w-full', 'p-4', 'rounded-lg', 'bg-zinc-200', 'text-left', 'text-zinc-800', 'overflow-hidden', 'dark:bg-zinc-700', 'dark:text-zinc-100', className)}
      {...rest}
    />
  );
});
CardItem.displayName = 'CardItem';

export default CardItem;
