type InfiniteAsideProps = {
	tags: string[];
	tagsCount: {
		[tag: string]: number;
	};
	postsCount: number;
	currentTag?: string;
} & React.HTMLAttributes<HTMLElement>;

export type { InfiniteAsideProps };
