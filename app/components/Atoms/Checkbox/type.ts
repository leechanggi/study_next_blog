import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

type CheckboxElement = React.ElementRef<typeof CheckboxPrimitive.Root>;
type CheckboxProps = {
	size?: 'default' | 'sm' | 'lg';
} & Omit<
	React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
	'children'
>;

export type { CheckboxElement, CheckboxProps };
