"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib";

const TooltipProvider = TooltipPrimitive.Provider;
const TooltipRoot = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
	React.ElementRef<typeof TooltipPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>((props, ref) => {
	const { sideOffset = 4, className, ...rest } = props;
	return (
		<TooltipPrimitive.Content
			ref={ref}
			sideOffset={sideOffset}
			className={cn(
				"z-20",
				"overflow-hidden",
				"rounded",
				"bg-white",
				"px-3",
				"py-1.5",
				"text-sm",
				"text-popover-foreground",
				"shadow",
				"animate-in",
				"fade-in-0",
				"zoom-in-95",
				"data-[state=closed]:animate-out",
				"data-[state=closed]:fade-out-0",
				"data-[state=closed]:zoom-out-95",
				"data-[side=bottom]:slide-in-from-top-2",
				"data-[side=left]:slide-in-from-right-2",
				"data-[side=right]:slide-in-from-left-2",
				"data-[side=top]:slide-in-from-bottom-2",
				"dark:bg-zinc-900",
				className
			)}
			{...rest}
		/>
	);
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

const Tooltip = {
	Provider: TooltipProvider,
	Root: TooltipRoot,
	Trigger: TooltipTrigger,
	Content: TooltipContent,
};

export default Tooltip;
