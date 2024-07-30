import React from 'react';

import { splitComma } from '@lib';
import { type TPosts } from '@service/posts';
import {
	Board,
	BoardItem,
	Card,
	InfiniteTags,
	InfiniteAside,
} from '@components';

const revalidate = 60;
const apiUrl = process.env.NEXT_PUBLIC_API_HOST;

const getUniqueTags = (posts: TPosts[]) => {
	const tagCount: { [tag: string]: number } = {};
	const tagSet = new Set<string>();

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
		uniqueTags: Array.from(tagSet),
		uniqueTagsCount: tagCount,
	};
};

const fetchPosts = async (tag?: string, q?: string) => {
	const res = await fetch(`${apiUrl}/api/posts`, {
		next: { revalidate },
	});
	const { data: posts } = await res.json();

	let filteredPosts: TPosts[] = posts;

	if (tag) {
		filteredPosts = filteredPosts.filter((post: TPosts) =>
			splitComma(post.tags).includes(tag)
		);
	}

	if (q) {
		const searchQuery = q.toLowerCase();
		filteredPosts = filteredPosts.filter(
			(post: TPosts) =>
				post.title.toLowerCase().includes(searchQuery) ||
				splitComma(post.tags).some(t => t.toLowerCase().includes(searchQuery))
		);
	}

	return { data: filteredPosts, ...getUniqueTags(posts) };
};

const Page = async ({
	searchParams,
}: {
	searchParams: { tag?: string; q?: string };
}) => {
	const { data, uniqueTags, uniqueTagsCount } = await fetchPosts(
		searchParams.tag,
		searchParams.q
	);

	return (
		<>
			<section className='desktop:hidden'>
				<InfiniteTags
					tags={uniqueTags}
					tagsCount={uniqueTagsCount}
					currentTag={searchParams.tag}
				/>
			</section>

			<InfiniteAside
				className='hidden desktop:block'
				tags={uniqueTags}
				tagsCount={uniqueTagsCount}
				currentTag={searchParams.tag}
			/>

			<section className='desktop:mt-0 mt-8'>
				{data.length < 1 ? (
					<>검색된 게시물이 없습니다.</>
				) : (
					<Board>
						{data.map((post: TPosts) => (
							<BoardItem key={post.post_id}>
								<Card
									href={`/posts/${post.post_id}`}
									title={post.title}
									content={post.content}
									createdAt={post.createdAt}
									tags={splitComma(post.tags)}
									imgSrc={post.imgSrc}
								/>
							</BoardItem>
						))}
					</Board>
				)}
			</section>
		</>
	);
};

export default Page;
