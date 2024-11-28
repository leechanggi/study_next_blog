'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { ViewUpdate } from '@codemirror/view';
import MarkdownEditor from '@uiw/react-markdown-editor';

import { cn } from '@/lib';
import { Markdown } from '@/components';
import * as Types from './type';

import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MDEditor = React.forwardRef<Types.MDEditorElement, Types.MDEditorProps>((props, forwardRef) => {
	const { className, value = '', wrappedClassName, visible = true, onChange, ...rest } = props;
	const { theme } = useTheme();
	const [content, setContent] = React.useState<string | undefined>(value);

	const handleChange = (value: string, viewUpdate: ViewUpdate) => {
		setContent(value);
		onChange?.(value, viewUpdate);
	};

	return (
		<div ref={forwardRef} className={cn(wrappedClassName)} data-color-mode={theme === 'dark' ? 'dark' : 'light'}>
			<MarkdownEditor
				className={cn('w-full', 'h-full', className)}
				value={content}
				onChange={handleChange}
				visible={visible}
				renderPreview={() => <Markdown>{content as string}</Markdown>}
				{...rest}
			/>
		</div>
	);
});

MDEditor.displayName = 'MarkdownEditor';

export default MDEditor;
