import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

type AlertDialogProps = {
	trigger?: React.ReactNode;
	content: React.ReactNode;
	title?: React.ReactNode;
	cancel?: React.ReactNode;
	action?: React.ReactNode;
	viewOverlay?: Boolean;
	onCancelClick?: () => void;
	onActionClick?: () => void;
} & Omit<AlertDialogPrimitive.AlertDialogProps, 'children'>;

type AlertDialogOverlayElement = React.ElementRef<
	typeof AlertDialogPrimitive.Overlay
>;
type AlertDialogOverlayProps = React.ComponentPropsWithoutRef<
	typeof AlertDialogPrimitive.Overlay
>;

type AlertDialogContentElement = React.ElementRef<
	typeof AlertDialogPrimitive.Content
>;
type AlertDialogContentProps = {
	viewOverlay?: Boolean;
} & React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>;

export type {
	AlertDialogProps,
	AlertDialogOverlayElement,
	AlertDialogOverlayProps,
	AlertDialogContentElement,
	AlertDialogContentProps,
};
