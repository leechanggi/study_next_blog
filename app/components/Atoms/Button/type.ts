type ButtonElement = HTMLButtonElement;
type ButtonProps = {
	asChild?: boolean;
	variant?:
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| 'link';
	size?: 'default' | 'sm' | 'lg' | 'icon';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type { ButtonElement, ButtonProps };
