'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib';

const TabsRoot = TabsPrimitive.Root;

const TabsList = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>((props, ref) => {
	const { className, ...rest } = props;
	return (
		<TabsPrimitive.List
			ref={ref}
			className={cn(
				'inline-flex',
				'h-10',
				'items-center',
				'justify-center',
				'rounded-md',
				'bg-zinc-100',
				'text-zinc-400',
				'p-1',
				className
			)}
			{...rest}
		/>
	);
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>((props, ref) => {
	const { className, ...rest } = props;
	return (
		<TabsPrimitive.Trigger
			ref={ref}
			className={cn(
				'inline-flex',
				'items-center',
				'justify-center',
				'whitespace-nowrap',
				'rounded-sm',
				'px-3',
				'py-1.5',
				'text-sm',
				'font-medium',
				'transition-all',
				'disabled:pointer-events-none',
				'disabled:opacity-60',
				'data-[state=active]:bg-white',
				'data-[state=active]:text-zinc-900',
				'data-[state=active]:shadow-sm',
				className
			)}
			{...rest}
		/>
	);
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>((props, ref) => {
	const { className, ...rest } = props;
	return (
		<TabsPrimitive.Content ref={ref} className={cn(className)} {...rest} />
	);
});
TabsContent.displayName = TabsPrimitive.Content.displayName;

const Tabs = {
	Root: TabsRoot,
	List: TabsList,
	Trigger: TabsTrigger,
	Content: TabsContent,
};

export default Tabs;
