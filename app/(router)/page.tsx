import React from 'react';
import axios from 'axios';
import { notFound } from 'next/navigation';

import { splitComma } from '@lib';
import { type TPosts } from '@service/posts';
import {
	Board,
	BoardItem,
	Card,
	InfiniteTags,
	InfiniteAside,
} from '@components';

const revalidate = 86400;
const apiUrl = process.env.NEXT_PUBLIC_API_HOST || '';

const getUniqueTags = (posts: TPosts[]) => {
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
		uniqueTags: Array.from(tagSet),
		uniqueTagsCount: tagCount,
	};
};

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

const getPosts = async (tag?: string, q?: string) => {
	const url = `${apiUrl}/api/posts`;
	const headers = {
		'Cache-Control': `max-age=${revalidate}, stale-while-revalidate=604800`, // 7일
	};

	try {
		const response = await axios.get(url, { headers });
		const posts: TPosts[] = response.data.data;

		const filteredPosts = getFilteredPosts(posts, tag, q);
		const uniqueTags = getUniqueTags(posts);

		return { ...filteredPosts, ...uniqueTags };
	} catch (error) {
		console.error('Failed to fetch posts:', error);
		throw new Error(
			'일시적인 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.'
		);
	}
};

const Page = async ({
	searchParams,
}: {
	searchParams: { tag?: string; q?: string };
}) => {
	const res = await getPosts(searchParams.tag, searchParams.q);

	if (!res) {
		return notFound();
	}

	const { data, uniqueTags, uniqueTagsCount } = res;

	return (
		<>
			<section className='desktop:hidden'>
				<InfiniteTags
					tags={uniqueTags}
					tagsCount={uniqueTagsCount}
					postsCount={data.length}
					currentTag={searchParams.tag}
				/>
			</section>

			<InfiniteAside
				className='hidden desktop:block'
				tags={uniqueTags}
				tagsCount={uniqueTagsCount}
				postsCount={data.length}
				currentTag={searchParams.tag}
			/>

			<section className='desktop:mt-0 mt-8'>
				{data.length < 1 ? (
					<p>검색된 게시물이 없습니다.</p>
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

export { revalidate };
export default Page;
