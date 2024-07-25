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
		const { children, className, ...rest } = props;
		const { theme } = useTheme();

		return (
			<div ref={forwardRef} className={cn(className)} data-ref='markdown'>
				<ReactMarkdown
					remarkPlugins={[remarkGfm]}
					components={{
						h1: ({ node, ...props }) => (
							<h3 className='text-5xl font-bold my-4' {...props} />
						),
						h2: ({ node, ...props }) => (
							<h3 className='text-4xl font-bold my-4' {...props} />
						),
						h3: ({ node, ...props }) => (
							<h3 className='text-3xl font-bold my-4' {...props} />
						),
						h4: ({ node, ...props }) => (
							<h4 className='text-2xl font-bold my-4' {...props} />
						),
						h5: ({ node, ...props }) => (
							<h5 className='text-xl font-bold my-4' {...props} />
						),
						h6: ({ node, ...props }) => (
							<h6 className='text-lg font-bold my-4' {...props} />
						),
						p: ({ node, ...props }) => (
							<p className='text-base my-4' {...props} />
						),
						a: ({ node, ...props }) => (
							<a className='text-blue-500 underline' {...props} />
						),
						ol: ({ node, depth, ...props }) => (
							<ol
								className={cn(
									'list-decimal',
									'list-inside',
									'my-4',
									depth > 0 ? `pl-${depth * 4}` : ''
								)}
								{...props}
							/>
						),
						ul: ({ node, depth, ...props }) => (
							<ul
								className={cn(
									'list-disc',
									'list-inside',
									'my-4',
									depth > 0 ? `pl-${depth * 4}` : ''
								)}
								{...props}
							/>
						),
						li: ({ node, index, ...props }) => (
							<li className='my-2' {...props} />
						),
						blockquote: ({ node, ...props }) => (
							<blockquote
								className='border-l-4 rounded-[0.3em] border-purple-600 text-neutral-800 my-4 py-4 pl-4 bg-oneLight dark:border-pink-600 dark:text-neutral-100 dark:bg-oneDark'
								{...props}
							/>
						),
						code: ({ node, inline, className, children, ...props }) => {
							const match = /language-(\w+)/.exec(className || '');
							return !inline && match ? (
								<SyntaxHighlighter
									{...props}
									className={'!my-0'}
									style={theme === 'dark' ? oneDark : oneLight}
									language={match[1]}
									PreTag='div'
								>
									{String(children).replace(/\n$/, '')}
								</SyntaxHighlighter>
							) : (
								<code {...props} className={cn('my-4', className)}>
									{children}
								</code>
							);
						},
						pre: ({ node, ...props }) => <pre className='my-4' {...props} />,
						img: image => (
							<Image
								src={image.src || ''}
								alt={image.alt || ''}
								width={500}
								height={350}
							/>
						),
						table: ({ node, ...props }) => (
							<table className='min-w-full bg-transparent border' {...props} />
						),
						thead: ({ node, ...props }) => (
							<thead className='bg-oneLight dark:bg-oneDark' {...props} />
						),
						th: ({ node, ...props }) => (
							<th className='px-4 py-2 border' {...props} />
						),
						tr: ({ node, ...props }) => <tr className='border-b' {...props} />,
						td: ({ node, ...props }) => (
							<td className='px-4 py-2 border' {...props} />
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
