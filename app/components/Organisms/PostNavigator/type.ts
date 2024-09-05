import { TPostsWithNav } from '@/service/post';

type PostNavigatorProps = {
	prev?: TPostsWithNav['prev'];
	next?: TPostsWithNav['next'];
} & React.HTMLAttributes<HTMLElement>;

export type { PostNavigatorProps };
