import React from 'react';

import { splitTags } from '@lib';
import { type TPosts } from '@service/posts';
import { Board, BoardItem, Card, InfiniteTags } from '@components';

// Route Segment Config
const revalidate = 0;

const apiUrl = process.env.NEXT_PUBLIC_API_HOST;

const getUniqueTags = (posts: TPosts[]): string[] => {
	const tagSet = new Set<string>();
	posts.forEach(post => {
		splitTags(post.tags).forEach(tag => tagSet.add(tag));
	});
	return Array.from(tagSet);
};

const fetchPosts = async (tag?: string) => {
	const res = await fetch(`${apiUrl}/api/posts`, {
		next: { revalidate },
	});
	const { data: posts } = await res.json();
	const data = tag
		? posts.filter((post: TPosts) => splitTags(post.tags).includes(tag))
		: posts;
	return { data, uniqueTags: getUniqueTags(posts) };
};

const Page = async ({ searchParams }: { searchParams: { tag?: string } }) => {
	const { data: postsData, uniqueTags } = await fetchPosts(searchParams.tag);

	return (
		<>
			<section>
				<InfiniteTags tags={uniqueTags} currentTag={searchParams.tag} />
			</section>
			<section className='mt-8'>
				<Board>
					{postsData.map((post: TPosts) => (
						<BoardItem key={post.post_id}>
							<Card
								href={`/posts/${post.post_id}`}
								title={post.title}
								content={post.content}
								createdAt={post.createdAt}
								tags={splitTags(post.tags)}
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
