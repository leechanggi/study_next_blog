import * as SelectPrimitive from '@radix-ui/react-select';

type SelectTriggerElement = React.ElementRef<typeof SelectPrimitive.Trigger>;
type SelectTriggerProps = React.ComponentPropsWithoutRef<
	typeof SelectPrimitive.Trigger
>;

type SelectScrollUpButtonElement = React.ElementRef<
	typeof SelectPrimitive.ScrollUpButton
>;
type SelectScrollUpButtonProps = React.ComponentPropsWithoutRef<
	typeof SelectPrimitive.ScrollUpButton
>;

type SelectScrollDownButtonElement = React.ElementRef<
	typeof SelectPrimitive.ScrollDownButton
>;
type SelectScrollDownButtonProps = React.ComponentPropsWithoutRef<
	typeof SelectPrimitive.ScrollDownButton
>;

type SelectContentElement = React.ElementRef<typeof SelectPrimitive.Content>;
type SelectContentProps = React.ComponentPropsWithoutRef<
	typeof SelectPrimitive.Content
>;

type SelectLabelElement = React.ElementRef<typeof SelectPrimitive.Label>;
type SelectLabelProps = React.ComponentPropsWithoutRef<
	typeof SelectPrimitive.Label
>;

type SelectItemElement = React.ElementRef<typeof SelectPrimitive.Item>;
type SelectItemProps = React.ComponentPropsWithoutRef<
	typeof SelectPrimitive.Item
>;

type SelectSeparatorElement = React.ElementRef<
	typeof SelectPrimitive.Separator
>;
type SelectSeparatorProps = React.ComponentPropsWithoutRef<
	typeof SelectPrimitive.Separator
>;

export type {
	SelectTriggerElement,
	SelectTriggerProps,
	SelectScrollUpButtonElement,
	SelectScrollUpButtonProps,
	SelectScrollDownButtonElement,
	SelectScrollDownButtonProps,
	SelectContentElement,
	SelectContentProps,
	SelectLabelElement,
	SelectLabelProps,
	SelectItemElement,
	SelectItemProps,
	SelectSeparatorElement,
	SelectSeparatorProps,
};
