type InfiniteTagsProps = {
	tags: string[];
	tagsCount: {
		[tag: string]: number;
	};
	currentTag?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export type { InfiniteTagsProps };
