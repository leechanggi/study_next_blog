'use client';

import * as React from 'react';
import { OTPInput, OTPInputContext } from 'input-otp';
import { LuDot } from 'react-icons/lu';
import { cn } from '@/lib';

const InputOTPRoot = React.forwardRef<
	React.ElementRef<typeof OTPInput>,
	React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
	<OTPInput
		ref={ref}
		containerClassName={cn(
			'flex items-center gap-2 has-[:disabled]:opacity-50',
			containerClassName
		)}
		className={cn('disabled:cursor-not-allowed', className)}
		{...props}
	/>
));
InputOTPRoot.displayName = 'InputOTP.Root';

const InputOTPGroup = React.forwardRef<
	React.ElementRef<'div'>,
	React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn('flex items-center', className)} {...props} />
));
InputOTPGroup.displayName = 'InputOTP.Group';

const InputOTPSlot = React.forwardRef<
	React.ElementRef<'div'>,
	React.ComponentPropsWithoutRef<'div'> & { index: number }
>(({ index, className, ...props }, ref) => {
	const inputOTPContext = React.useContext(OTPInputContext);
	const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

	return (
		<div
			ref={ref}
			className={cn(
				'relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md',
				isActive && 'z-10 ring-2 ring-ring ring-offset-background',
				className
			)}
			{...props}
		>
			{char}
			{hasFakeCaret && (
				<div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
					<div className='h-4 w-px animate-caret-blink duration-1000' />
				</div>
			)}
		</div>
	);
});
InputOTPSlot.displayName = 'InputOTP.Slot';

const InputOTPSeparator = React.forwardRef<
	React.ElementRef<'div'>,
	React.ComponentPropsWithoutRef<'div'>
>(({ ...props }, ref) => (
	<div ref={ref} role='separator' {...props}>
		<LuDot />
	</div>
));
InputOTPSeparator.displayName = 'InputOTP.Separator';

const InputOTP = {
	Root: InputOTPRoot,
	Group: InputOTPGroup,
	Slot: InputOTPSlot,
	Separator: InputOTPSeparator,
};

export default InputOTP;
