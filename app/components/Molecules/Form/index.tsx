'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import {
	Controller,
	ControllerProps,
	FieldPath,
	FieldValues,
	FormProvider,
} from 'react-hook-form';

import { cn, useFormField, FormFieldContext, FormItemContext } from '@lib';
import { Label } from '@components';

const FormRoot = FormProvider;

const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
	props: ControllerProps<TFieldValues, TName>
) => {
	const { name, ...rest } = props;

	return (
		<FormFieldContext.Provider value={{ name }}>
			<Controller name={name} {...rest} />
		</FormFieldContext.Provider>
	);
};

const FormItem = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>((props, forwardRef) => {
	const { className, ...rest } = props;
	const id = React.useId();

	return (
		<FormItemContext.Provider value={{ id }}>
			<div
				ref={forwardRef}
				className={cn('flex', 'flex-col', className)}
				{...rest}
			/>
		</FormItemContext.Provider>
	);
});
FormItem.displayName = 'Form.Item';

const FormLabel = React.forwardRef<
	React.ElementRef<typeof LabelPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>((props, forwardRef) => {
	const { className, ...rest } = props;
	const { formItemId } = useFormField();

	return (
		<Label
			ref={forwardRef}
			className={cn(className)}
			htmlFor={formItemId}
			{...rest}
		/>
	);
});
FormLabel.displayName = 'Form.Label';

const FormControl = React.forwardRef<
	React.ElementRef<typeof Slot>,
	React.ComponentPropsWithoutRef<typeof Slot>
>((props, forwardRef) => {
	const { className, ...rest } = props;
	const { error, formItemId, formDescriptionId, formMessageId } =
		useFormField();

	return (
		<Slot
			ref={forwardRef}
			id={formItemId}
			className={cn(className)}
			aria-describedby={
				!error
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={!!error}
			{...rest}
		/>
	);
});
FormControl.displayName = 'Form.Control';

const FormDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>((props, forwardRef) => {
	const { className, ...rest } = props;
	const { formDescriptionId } = useFormField();

	return (
		<p
			ref={forwardRef}
			id={formDescriptionId}
			className={cn(className)}
			{...rest}
		/>
	);
});
FormDescription.displayName = 'Form.Description';

const FormMessage = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>((props, forwardRef) => {
	const { className, children, ...rest } = props;
	const { error, formMessageId } = useFormField();
	const body = error ? String(error?.message) : children;

	if (!body) {
		return null;
	}

	return (
		<p
			ref={forwardRef}
			id={formMessageId}
			className={cn('text-red-600', 'text-sm', 'mt-1', 'pl-1', className)}
			{...rest}
		>
			{body}
		</p>
	);
});
FormMessage.displayName = 'Form.Message';

const Form = {
	Root: FormRoot,
	Field: FormField,
	Item: FormItem,
	Label: FormLabel,
	Control: FormControl,
	Description: FormDescription,
	Message: FormMessage,
};

export default Form;
