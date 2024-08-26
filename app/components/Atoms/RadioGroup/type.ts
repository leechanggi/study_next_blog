import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

type RadioGroupRootElement = React.ElementRef<typeof RadioGroupPrimitive.Root>;
type RadioGroupRootProps = React.ComponentPropsWithoutRef<
	typeof RadioGroupPrimitive.Root
>;
type RadioGroupItemElement = React.ElementRef<typeof RadioGroupPrimitive.Item>;
type RadioGroupItemProps = Omit<
	React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
	'children'
>;

export type {
	RadioGroupRootElement,
	RadioGroupRootProps,
	RadioGroupItemElement,
	RadioGroupItemProps,
};
