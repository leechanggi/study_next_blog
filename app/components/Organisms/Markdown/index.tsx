'use client';

import React from 'react';
import Image from 'next/image';

import { useTheme } from 'next-themes';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
	oneDark,
	oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

import { cn } from '@lib';
import * as Type from './type';

const Markdown = React.forwardRef<HTMLDivElement, Type.MarkdownProps>(
	(props, forwardRef) => {
		const { theme } = useTheme();
		const { children, className, ...rest } = props;

		return (
			<div
				ref={forwardRef}
				className={cn(
					'prose',
					'max-w-none',
					'prose-zinc',
					'dark:prose-invert',
					className
				)}
				data-ref='markdown'
			>
				<ReactMarkdown
					remarkPlugins={[remarkGfm]}
					components={{
						code: ({ node, inline, className, children, ...props }) => {
							const match = /language-(\w+)/.exec(className || '');
							return !inline && match ? (
								<SyntaxHighlighter
									{...props}
									style={theme === 'dark' ? oneDark : oneLight}
									language={match[1]}
									PreTag='div'
								>
									{String(children).replace(/\n$/, '')}
								</SyntaxHighlighter>
							) : (
								<code {...props} className={cn(className)}>
									{children}
								</code>
							);
						},
						pre: ({ node, ...props }) => (
							<pre className='not-prose' {...props} />
						),
						img: image => (
							<Image
								src={image.src || ''}
								alt={image.alt || ''}
								width={500}
								height={350}
							/>
						),
					}}
					{...rest}
				>
					{children}
				</ReactMarkdown>
			</div>
		);
	}
);
Markdown.displayName = 'Markdown';

export default Markdown;
