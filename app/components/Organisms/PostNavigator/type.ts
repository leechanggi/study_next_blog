import { TPostsWithNav } from '@/service/posts';

type PostNavigatorProps = {
	prev?: TPostsWithNav['prev'];
	next?: TPostsWithNav['next'];
} & React.HTMLAttributes<HTMLElement>;

export type { PostNavigatorProps };
