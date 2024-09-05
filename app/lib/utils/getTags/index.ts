import { TPosts } from '@/service/post';
import splitComma from '@/lib/utils/splitComma';

const getTags = (posts: TPosts[]) => {
	const tagSet = new Set<string>();
	const tagCount: { [tag: string]: number } = {};

	posts.forEach(post => {
		splitComma(post.tags).forEach(tag => {
			tagSet.add(tag);
			if (tagCount[tag]) {
				tagCount[tag]++;
			} else {
				tagCount[tag] = 1;
			}
		});
	});

	return {
		tags: Array.from(tagSet),
		tagsCount: tagCount,
	};
};

export default getTags;
