import * as AccordionPrimitive from '@radix-ui/react-accordion';

type AccordionItemElement = React.ElementRef<
	typeof AccordionPrimitive.AccordionItem
>;
type AccordionItemProps = React.ComponentPropsWithoutRef<
	typeof AccordionPrimitive.AccordionItem
>;
type AccordionTriggerElement = React.ElementRef<
	typeof AccordionPrimitive.Trigger
>;
type AccordionTriggerProps = React.ComponentPropsWithoutRef<
	typeof AccordionPrimitive.Trigger
>;
type AccordionContentElement = React.ElementRef<
	typeof AccordionPrimitive.Content
>;
type AccordionContentProps = React.ComponentPropsWithoutRef<
	typeof AccordionPrimitive.Content
>;

export type {
	AccordionItemElement,
	AccordionItemProps,
	AccordionTriggerElement,
	AccordionTriggerProps,
	AccordionContentElement,
	AccordionContentProps,
};
