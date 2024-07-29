'use client';

import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { cn } from '@lib';
import { Button } from '@components';
import * as Type from './type';

const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;
const DialogTitle = DialogPrimitive.Title;
const DialogDescription = DialogPrimitive.Description;

DialogTrigger.displayName = DialogPrimitive.Trigger.displayName;
DialogPortal.displayName = DialogPrimitive.Portal.displayName;
DialogClose.displayName = DialogPrimitive.Close.displayName;
DialogTitle.displayName = DialogPrimitive.Title.displayName;
DialogDescription.displayName = DialogPrimitive.Description.displayName;

const DialogOverlay = React.forwardRef<
	Type.DialogOverlayElement,
	Type.DialogOverlayProps
>((props, forwardRef) => {
	const { className, ...rest } = props;

	return (
		<DialogPrimitive.Overlay
			ref={forwardRef}
			className={cn(
				'fixed top-0 right-0 bottom-0 left-0 z-20 bg-black/20',
				className
			)}
			{...rest}
		/>
	);
});
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
	Type.DialogContentElement,
	Type.DialogContentProps
>((props, ref) => {
	const { title, className, children, ...rest } = props;

	return (
		<DialogPortal>
			<DialogOverlay />
			<DialogPrimitive.Content
				ref={ref}
				className={cn(
					'fixed left-[50%] top-[50%] z-30 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] bg-white p-4 shadow-lg rounded-md duration-200 data-[state=open]:animate-slideIn data-[state=closed]:animate-slideOut dark:bg-zinc-900',
					className
				)}
				{...rest}
			>
				<div className='flex items-start justify-end pb-[0.375rem]'>
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
					<div className='mt-2'>{children}</div>
				</DialogDescription>
			</DialogPrimitive.Content>
		</DialogPortal>
	);
});
DialogContent.displayName = 'Dialog.Content';

const Dialog = (props: Type.DialogProps) => {
	const { trigger, content, title, ...rest } = props;
	return (
		<DialogPrimitive.Root {...rest}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogPortal>
				<DialogOverlay />
				<DialogContent title={title}>{content}</DialogContent>
			</DialogPortal>
		</DialogPrimitive.Root>
	);
};
Dialog.displayName = 'Dialog';

export default Dialog;
