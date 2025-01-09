'use client';

import React from 'react';

import * as Types from './type';
import { cn } from '@/lib';

const CardList = React.forwardRef<Types.CardListElement, Types.CardListProps>((props, forwardRef) => {
  const { className, ...rest } = props;

  return <ul ref={forwardRef} className={cn('w-full', 'text-center', 'text-zinc-800', 'overflow-hidden', 'dark:text-zinc-100', className)} {...rest} />;
});
CardList.displayName = 'CardList';

export default CardList;
