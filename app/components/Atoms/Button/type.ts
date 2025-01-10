import React from 'react';

type ButtonElement = HTMLButtonElement;
type ButtonProps = {
  asChild?: boolean;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  customStyleOnly?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type { ButtonElement, ButtonProps };
