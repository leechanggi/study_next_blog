import * as PopoverPrimitive from '@radix-ui/react-popover';

type PopoverContentElement = React.ElementRef<typeof PopoverPrimitive.Content>;
type PopoverContentProps = React.ComponentPropsWithoutRef<
	typeof PopoverPrimitive.Content
>;

export type { PopoverContentElement, PopoverContentProps };
