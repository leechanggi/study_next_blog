import * as SelectPrimitive from "@radix-ui/react-select";

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

export type {
	SelectTriggerElement,
	SelectTriggerProps,
	SelectScrollUpButtonElement,
	SelectScrollUpButtonProps,
};
