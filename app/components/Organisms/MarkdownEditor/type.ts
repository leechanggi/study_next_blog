import { Markdown } from '@/components';
import { IMarkdownEditor } from '@uiw/react-markdown-editor';

type MDEditorElement = HTMLDivElement;
type MDEditorProps = {
	value?: React.ComponentProps<typeof Markdown>['children'];
	wrappedClassName?: string;
} & Omit<IMarkdownEditor, 'children' | 'renderPreview'>;

export type { MDEditorElement, MDEditorProps };
