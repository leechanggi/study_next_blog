'use client';

import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import { cn } from '@lib';
import * as Types from './type';

const AlertDialogRoot = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;
const AlertDialogTitle = AlertDialogPrimitive.Title;
const AlertDialogDescription = AlertDialogPrimitive.Description;
const AlertDialogAction = AlertDialogPrimitive.Action;
const AlertDialogCancel = AlertDialogPrimitive.Cancel;

const AlertDialogOverlay = React.forwardRef<
	Types.AlertDialogOverlayElement,
	Types.AlertDialogOverlayProps
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Overlay
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
		{...props}
		ref={ref}
	/>
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
	Types.AlertDialogContentElement,
	Types.AlertDialogContentProps
>((props, ref) => {
	const { className, viewOverlay, ...rest } = props;

	return (
		<AlertDialogPortal>
			{viewOverlay && <AlertDialogOverlay />}
			<AlertDialogPrimitive.Content
				ref={ref}
				className={cn(
					'fixed',
					'left-[50%]',
					'top-[50%]',
					'z-30',
					'grid',
					'w-full',
					'max-w-md',
					'translate-x-[-50%]',
					'translate-y-[-50%]',
					'bg-white',
					'p-6',
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
			/>
		</AlertDialogPortal>
	);
});
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialog = (props: Types.AlertDialogProps) => {
	const {
		trigger,
		content,
		title,
		cancel,
		action,
		viewOverlay = true,
		onCancelClick,
		onActionClick,
		...rest
	} = props;

	return (
		<AlertDialogRoot {...rest}>
			<AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
			<AlertDialogContent viewOverlay={viewOverlay}>
				{title && (
					<AlertDialogTitle className='flex-grow pt-[0.375rem] text-lg font-bold ellipsis-2'>
						{title}
					</AlertDialogTitle>
				)}

				<AlertDialogDescription asChild>
					<div>{content}</div>
				</AlertDialogDescription>

				{(cancel || action) && (
					<div className='flex items-center justify-end mt-4'>
						{cancel && (
							<AlertDialogCancel
								asChild
								onClick={event => {
									event.preventDefault();
									onCancelClick && onCancelClick();
								}}
							>
								{cancel}
							</AlertDialogCancel>
						)}
						{action && (
							<AlertDialogAction
								asChild
								onClick={event => {
									event.preventDefault();
									onActionClick && onActionClick();
								}}
							>
								{action}
							</AlertDialogAction>
						)}
					</div>
				)}
			</AlertDialogContent>
		</AlertDialogRoot>
	);
};
AlertDialog.displaynema = 'AlertDialog';

export default AlertDialog;
