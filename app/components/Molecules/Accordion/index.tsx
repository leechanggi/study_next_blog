'use client';

import React from 'react';
import { RxChevronDown } from 'react-icons/rx';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

import { cn } from '@lib';
import * as Types from './type';

const AccordionRoot = AccordionPrimitive.Root;
AccordionRoot.displayName = AccordionPrimitive.Root.displayName;

const AccordionItem = React.forwardRef<
	Types.AccordionItemElement,
	Types.AccordionItemProps
>((props, ref) => {
	const { className, ...rest } = props;

	return (
		<AccordionPrimitive.Item
			ref={ref}
			className={cn('border-b', className)}
			{...rest}
		/>
	);
});
AccordionItem.displayName = AccordionPrimitive.Item.displayName;

const AccordionTrigger = React.forwardRef<
	Types.AccordionTriggerElement,
	Types.AccordionTriggerProps
>((props, ref) => {
	const { className, children, ...rest } = props;

	return (
		<AccordionPrimitive.Header asChild>
			<AccordionPrimitive.Trigger
				ref={ref}
				className={cn(
					'relative',
					'w-full',
					'pr-7',
					'py-4',
					'font-medium',
					'text-left',
					'transition-all',
					'[&[data-state=open]>svg]:rotate-180',
					className
				)}
				{...rest}
			>
				{children}
				<RxChevronDown
					className='absolute top-4 right-0 transition-transform duration-200'
					size='1.5rem'
				/>
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
	Types.AccordionContentElement,
	Types.AccordionContentProps
>((props, ref) => {
	const { className, children, ...rest } = props;

	return (
		<AccordionPrimitive.Content
			ref={ref}
			className='overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
			{...rest}
		>
			<div className={cn(className)}>{children}</div>
		</AccordionPrimitive.Content>
	);
});
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

const Accordion = {
	Root: AccordionRoot,
	Item: AccordionItem,
	Trigger: AccordionTrigger,
	Content: AccordionContent,
};

export default Accordion;
