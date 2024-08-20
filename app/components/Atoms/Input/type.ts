type InputProps = {
	type?:
		| 'number'
		| 'password'
		| 'search'
		| 'tel'
		| 'text'
		| 'url'
		| 'file'
		| 'hidden';
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

export type { InputProps };
