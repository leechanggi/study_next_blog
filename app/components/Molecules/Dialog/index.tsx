'use client';

import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { cn } from '@lib';
import { Button } from '@components';
import * as Types from './type';

const DialogTrigger = DialogPrimitive.Trigger;
DialogTrigger.displayName = DialogPrimitive.Trigger.displayName;

const DialogPortal = DialogPrimitive.Portal;
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogClose = DialogPrimitive.Close;
DialogClose.displayName = DialogPrimitive.Close.displayName;

const DialogTitle = DialogPrimitive.Title;
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = DialogPrimitive.Description;
DialogDescription.displayName = DialogPrimitive.Description.displayName;

const DialogOverlay = React.forwardRef<
	Types.DialogOverlayElement,
	Types.DialogOverlayProps
>((props, forwardRef) => {
	const { className, ...rest } = props;

	return (
		<DialogPrimitive.Overlay
			ref={forwardRef}
			className={cn(
				'fixed',
				'top-0',
				'right-0',
				'bottom-0',
				'left-0',
				'z-20',
				'bg-black/20',
				className
			)}
			{...rest}
		/>
	);
});
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
	Types.DialogContentElement,
	Types.DialogContentProps
>((props, ref) => {
	const { title, className, children, viewOverlay, ...rest } = props;

	return (
		<DialogPortal>
			{viewOverlay && <DialogOverlay />}
			<DialogPrimitive.Content
				ref={ref}
				className={cn(
					'fixed',
					'left-[50%]',
					'top-[50%]',
					'z-30',
					'w-full',
					'max-w-lg',
					'translate-x-[-50%]',
					'translate-y-[-50%]',
					'bg-white',
					'py-4',
					'px-6',
					'shadow-xl',
					'rounded-lg',
					'duration-200',
					'overflow-hidden',
					'data-[state=open]:animate-slideIn',
					'data-[state=closed]:animate-slideOut',
					'dark:bg-zinc-800',
					className
				)}
				{...rest}
			>
				<div className='flex items-start justify-end pb-[0.375rem] -mr-2'>
					{title && (
						<DialogTitle className='flex-grow pt-[0.375rem] text-lg font-bold ellipsis-2'>
							{title}
						</DialogTitle>
					)}
					<DialogPrimitive.Close asChild>
						<Button variant='ghost' size='icon' className='flex-shrink-0'>
							<RxCross2 size='1.25em' />
							<span className='sr-only'>닫기</span>
						</Button>
					</DialogPrimitive.Close>
				</div>
				<DialogDescription asChild>
					<div>{children}</div>
				</DialogDescription>
			</DialogPrimitive.Content>
		</DialogPortal>
	);
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const Dialog = (props: Types.DialogProps) => {
	const { trigger, content, title, viewOverlay = true, ...rest } = props;
	return (
		<DialogPrimitive.Root {...rest}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogPortal>
				<DialogContent title={title} viewOverlay={viewOverlay}>
					{content}
				</DialogContent>
			</DialogPortal>
		</DialogPrimitive.Root>
	);
};
Dialog.displayName = 'Dialog';

export default Dialog;
