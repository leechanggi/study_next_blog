'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { ViewUpdate } from '@codemirror/view';

import { cn } from '@/lib';
import { Markdown } from '@/components';
import * as Types from './type';

import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const Editor = dynamic(
	() => import('@uiw/react-markdown-editor').then(mod => mod.default),
	{ ssr: false }
);

const MarkdownEditor = React.forwardRef<
	HTMLDivElement,
	Types.MarkdownEditorProps
>((props, ref) => {
	const {
		name,
		wrappedClassName,
		className,
		value = '',
		visible = true,
		onChange,
		onBlur,
		...rest
	} = props;
	const { theme } = useTheme();
	const editorRef = React.useRef<HTMLDivElement | null>(null);
	const [content, setContent] = React.useState<string | undefined>(value);

	React.useImperativeHandle(ref, () => editorRef.current as HTMLDivElement, []);

	const handleChange = (value: string, viewUpdate: ViewUpdate) => {
		setContent(value);
		onChange?.(value, viewUpdate);
	};

	return (
		<div
			ref={editorRef}
			data-name={name}
			data-color-mode={theme === 'dark' ? 'dark' : 'light'}
			className={cn(wrappedClassName)}
		>
			<Editor
				className={cn('h-full', className)}
				value={content}
				visible={visible}
				onChange={handleChange}
				onBlur={onBlur}
				renderPreview={() => <Markdown>{content as string}</Markdown>}
				{...rest}
			/>
		</div>
	);
});

MarkdownEditor.displayName = 'MarkdownEditor';

export default MarkdownEditor;
