type InputProps = {
	type?: 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

export type { InputProps };
