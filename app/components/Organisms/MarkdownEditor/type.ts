import { Markdown } from '@/components';
import { IMarkdownEditor } from '@uiw/react-markdown-editor';

type MarkdownEditorProps = {
	ref?: React.Ref<HTMLDivElement>;
	name?: string;
	value?: React.ComponentProps<typeof Markdown>['children'];
	wrappedClassName?: string;
} & Omit<IMarkdownEditor, 'children' | 'renderPreview'>;

export type { MarkdownEditorProps };
