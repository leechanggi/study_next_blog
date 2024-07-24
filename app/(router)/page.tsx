import React from 'react';
import Link from 'next/link';

import { Board, BoardItem, Button, Card } from '@components';
import { type TPosts } from '@service/posts';
import { splitTags } from '@lib';

const revalidate = 60;

const getUniqueTags = (posts: TPosts[]): string[] => {
	const tagSet = new Set<string>();
	posts.forEach(post => {
		splitTags(post.tags).forEach(tag => tagSet.add(tag));
	});
	return Array.from(tagSet);
};

const fetchPosts = async (tag?: string) => {
	const apiUrl = process.env.NEXT_PUBLIC_API_HOST;
	const res = await fetch(`${apiUrl}/api/posts`);
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
			<div className='flex flex-wrap gap-4'>
				<Button variant='secondary' className='rounded-full' asChild>
					<Link href={{ pathname: '/' }}>All</Link>
				</Button>
				{uniqueTags.map(tag => (
					<Button
						key={tag}
						variant='secondary'
						className='rounded-full'
						asChild
					>
						<Link href={{ query: { tag } }}>#{tag}</Link>
					</Button>
				))}
			</div>

			<Board className='mt-8'>
				{postsData.map((post: TPosts) => (
					<BoardItem key={post.post_id}>
						<Card
							href={`/${post.post_id}`}
							title={post.title}
							content={post.content}
							createdAt={post.createdAt}
							tags={splitTags(post.tags)}
							imgSrc={post.imgSrc}
						/>
					</BoardItem>
				))}
			</Board>
		</>
	);
};

export { revalidate };
export default Page;
