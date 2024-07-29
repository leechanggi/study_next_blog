type InfiniteAsideProps = {
	tags: string[];
	tagsCount: {
		[tag: string]: number;
	};
	currentTag?: string;
} & React.HTMLAttributes<HTMLElement>;

export type { InfiniteAsideProps };
