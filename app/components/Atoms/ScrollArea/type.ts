import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

type ScrollBarElement = React.ElementRef<
	typeof ScrollAreaPrimitive.ScrollAreaScrollbar
>;
type ScrollBarProps = React.ComponentPropsWithoutRef<
	typeof ScrollAreaPrimitive.ScrollAreaScrollbar
>;

type ScrollAreaElement = React.ElementRef<typeof ScrollAreaPrimitive.Root>;
type ScrollAreaProps = React.ComponentPropsWithoutRef<
	typeof ScrollAreaPrimitive.Root
>;

export type {
	ScrollBarElement,
	ScrollBarProps,
	ScrollAreaElement,
	ScrollAreaProps,
};
