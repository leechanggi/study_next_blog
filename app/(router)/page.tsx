import React from 'react';

import { Board, BoardItem, Button, Card } from '@components';
import { type TPosts } from '@service/posts';
import Link from 'next/link';

const revalidate = 60;

const extractTags = (posts: TPosts[]): string[] => {
	const allTags: string[] = [];

	posts.forEach(post => {
		post.tags.forEach(tag => {
			if (!allTags.includes(tag)) {
				allTags.push(tag);
			}
		});
	});

	return allTags;
};

const fetchPosts = async (tag?: string) => {
	const apiUrl = process.env.NEXT_PUBLIC_API_HOST;
	const res = await fetch(`${apiUrl}/api/posts`);
	const { data: post } = await res.json();
	const data = tag
		? post.filter((post: TPosts) => post.tags.includes(tag))
		: post;
	return { data, extractTags: extractTags(data) };
};

const Page = async ({ searchParams }: { searchParams: { tag?: string } }) => {
	const filteredPosts = await fetchPosts(searchParams.tag);
	const { data, extractTags } = filteredPosts;

	return (
		<>
			<div className='flex flex-wrap gap-4'>
				<Button variant='secondary' className='rounded-full' asChild>
					<Link href={{ pathname: '/' }}>All</Link>
				</Button>
				{extractTags.map(tag => (
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
				{data.map((post: TPosts) => (
					<BoardItem key={post.id}>
						<Card
							href={`/${post.id}`}
							title={post.title}
							content={post.content}
							createdAt={post.createdAt}
							tags={post.tags}
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
