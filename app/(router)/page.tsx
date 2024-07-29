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

// Route Segment Config
const revalidate = 0;

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

const fetchPosts = async (tag?: string) => {
	const res = await fetch(`${apiUrl}/api/posts`, {
		next: { revalidate },
	});
	const { data: posts } = await res.json();
	const data = tag
		? posts.filter((post: TPosts) => splitComma(post.tags).includes(tag))
		: posts;
	return { data, ...getUniqueTags(posts) };
};

const Page = async ({ searchParams }: { searchParams: { tag?: string } }) => {
	const { data, uniqueTags, uniqueTagsCount } = await fetchPosts(
		searchParams.tag
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
			</section>
		</>
	);
};

export default Page;
