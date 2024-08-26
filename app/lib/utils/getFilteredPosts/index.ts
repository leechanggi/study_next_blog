import { TPosts } from '@/service/posts';
import splitComma from '@/lib/utils/splitComma';

const getFilteredPosts = (posts: TPosts[], tag?: string, q?: string) => {
	let filteredPosts: TPosts[] = posts;

	if (tag) {
		filteredPosts = filteredPosts.filter(post =>
			splitComma(post.tags).includes(tag)
		);
	}

	if (q) {
		const searchQuery = q.toLowerCase();

		filteredPosts = filteredPosts.filter(
			post =>
				post.title.toLowerCase().includes(searchQuery) ||
				splitComma(post.tags).some(t => t.toLowerCase().includes(searchQuery))
		);
	}

	return { data: Array.from(filteredPosts) };
};

export default getFilteredPosts;
