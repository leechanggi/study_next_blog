import * as DialogPrimitive from '@radix-ui/react-dialog';

type DialogProps = {
	trigger: React.ReactNode;
	content: React.ReactNode;
	title?: React.ReactNode;
	viewOverlay?: Boolean;
} & Omit<DialogPrimitive.DialogProps, 'children'>;

type DialogOverlayElement = React.ElementRef<typeof DialogPrimitive.Overlay>;
type DialogOverlayProps = React.ComponentPropsWithoutRef<
	typeof DialogPrimitive.Overlay
>;

type DialogContentElement = React.ElementRef<typeof DialogPrimitive.Content>;
type DialogContentProps = {
	title?: React.ReactNode;
	viewOverlay?: Boolean;
} & Omit<
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
	'title'
>;

export type {
	DialogProps,
	DialogOverlayElement,
	DialogOverlayProps,
	DialogContentElement,
	DialogContentProps,
};
