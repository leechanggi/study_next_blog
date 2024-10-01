'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { RxChevronDown, RxChevronUp, RxCheck } from 'react-icons/rx';

import * as Types from './type';
import { cn } from '@/lib';

const SelectRoot = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
	Types.SelectTriggerElement,
	Types.SelectTriggerProps
>((props, ref) => {
	const { className, children, ...rest } = props;
	return (
		<SelectPrimitive.Trigger
			ref={ref}
			className={cn(
				'flex',
				'h-10',
				'w-full',
				'items-center',
				'justify-between',
				'rounded-md',
				'border',
				'border-zinc-200',
				'bg-transparent',
				'px-3',
				'py-2',
				'text-sm',
				'placeholder:text-zinc-400',
				'disabled:cursor-not-allowed',
				'disabled:opacity-50',
				'[&>span]:line-clamp-1',
				'dark:border-zinc-700',
				className
			)}
			{...rest}
		>
			{children}
			<SelectPrimitive.Icon asChild>
				<RxChevronDown size='1rem' className='opacity-50' />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	);
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
	Types.SelectScrollUpButtonElement,
	Types.SelectScrollUpButtonProps
>((props, ref) => {
	const { className, ...rest } = props;
	return (
		<SelectPrimitive.ScrollUpButton
			ref={ref}
			className={cn(
				'flex',
				'cursor-default',
				'items-center',
				'justify-center',
				'py-1',
				className
			)}
			{...rest}
		>
			<RxChevronUp size='1rem' />
		</SelectPrimitive.ScrollUpButton>
	);
});
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
	Types.SelectScrollDownButtonElement,
	Types.SelectScrollDownButtonProps
>((props, ref) => {
	const { className, ...rest } = props;
	return (
		<SelectPrimitive.ScrollDownButton
			ref={ref}
			className={cn(
				'flex',
				'cursor-default',
				'items-center',
				'justify-center',
				'py-1',
				className
			)}
			{...rest}
		>
			<RxChevronDown className='h-4 w-4' />
		</SelectPrimitive.ScrollDownButton>
	);
});
SelectScrollDownButton.displayName =
	SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
	Types.SelectContentElement,
	Types.SelectContentProps
>((props, ref) => {
	const { className, children, position = 'popper', ...rest } = props;
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				ref={ref}
				className={cn(
					'relative',
					'z-50',
					'max-h-96',
					'min-w-[8rem]',
					'overflow-hidden',
					'rounded-md',
					'border',
					'bg-white',
					'shadow-md',
					'dark:bg-zinc-900',
					'data-[state=open]:animate-in',
					'data-[state=closed]:animate-out',
					'data-[state=closed]:fade-out-0',
					'data-[state=open]:fade-in-0',
					'data-[state=closed]:zoom-out-95',
					'data-[state=open]:zoom-in-95',
					'data-[side=bottom]:slide-in-from-top-2',
					'data-[side=left]:slide-in-from-right-2',
					'data-[side=right]:slide-in-from-left-2',
					'data-[side=top]:slide-in-from-bottom-2',
					position === 'popper' &&
						cn(
							'data-[side=bottom]:translate-y-1',
							'data-[side=left]:-translate-x-1',
							'data-[side=right]:translate-x-1',
							'data-[side=top]:-translate-y-1'
						),
					className
				)}
				position={position}
				{...rest}
			>
				<SelectScrollUpButton />
				<SelectPrimitive.Viewport
					className={cn(
						'p-1',
						position === 'popper' &&
							cn(
								'h-[var(--radix-select-trigger-height)]',
								'w-full min-w-[var(--radix-select-trigger-width)]'
							)
					)}
				>
					{children}
				</SelectPrimitive.Viewport>
				<SelectScrollDownButton />
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	);
});
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
	Types.SelectLabelElement,
	Types.SelectContentProps
>((props, ref) => {
	const { className, ...rest } = props;
	return (
		<SelectPrimitive.Label
			ref={ref}
			className={cn(
				'py-1.5',
				'pl-8',
				'pr-2',
				'text-sm',
				'font-semibold',
				className
			)}
			{...rest}
		/>
	);
});
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
	Types.SelectItemElement,
	Types.SelectItemProps
>((props, ref) => {
	const { className, children, ...rest } = props;
	return (
		<SelectPrimitive.Item
			ref={ref}
			className={cn(
				'relative',
				'flex',
				'w-full',
				'cursor-default',
				'select-none',
				'items-center',
				'rounded-sm',
				'py-1.5',
				'pl-8',
				'pr-2',
				'text-sm',
				'outline-none',
				'data-[disabled]:pointer-events-none',
				'data-[disabled]:opacity-50',
				className
			)}
			{...rest}
		>
			<span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
				<SelectPrimitive.ItemIndicator>
					<RxCheck size='1rem' />
				</SelectPrimitive.ItemIndicator>
			</span>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	);
});
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
	Types.SelectSeparatorElement,
	Types.SelectSeparatorProps
>((props, ref) => {
	const { className, ...rest } = props;
	return (
		<SelectPrimitive.Separator
			ref={ref}
			className={cn(
				'-mx-1',
				'my-1',
				'h-px',
				'bg-zinc-200',
				'dark:border-zinc-700',
				className
			)}
			{...rest}
		/>
	);
});
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

const Select = {
	Root: SelectRoot,
	Group: SelectGroup,
	Value: SelectValue,
	Trigger: SelectTrigger,
	Content: SelectContent,
	Label: SelectLabel,
	Item: SelectItem,
	Separator: SelectSeparator,
	ScrollUpButton: SelectScrollUpButton,
	ScrollDownButton: SelectScrollDownButton,
};

export default Select;
