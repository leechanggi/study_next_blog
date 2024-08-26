import React from 'react';
import { notFound } from 'next/navigation';

import { splitComma, getPosts, getTags, getFilteredPosts } from '@/lib';
import { type TPosts } from '@/service/posts';
import {
	Board,
	BoardItem,
	Card,
	InfiniteTags,
	InfiniteAside,
} from '@/components';

const revalidate = 86400;

const getFilteredPostsWithTags = async (tag?: string, q?: string) => {
	try {
		const posts = await getPosts();
		const postsCount = posts.length;
		const filteredPosts = getFilteredPosts(posts, tag, q);
		const tags = getTags(posts);

		return { postsCount, ...filteredPosts, ...tags };
	} catch (error) {
		console.error('Error fetching post:', error);
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
	const res = await getFilteredPostsWithTags(searchParams.tag, searchParams.q);

	if (!res) {
		return notFound();
	}

	const { postsCount, data, tags, tagsCount } = res;

	return (
		<>
			<section className='desktop:hidden'>
				<InfiniteTags
					tags={tags}
					tagsCount={tagsCount}
					postsCount={postsCount}
					currentTag={searchParams.tag}
				/>
			</section>

			<InfiniteAside
				className='hidden desktop:block'
				tags={tags}
				tagsCount={tagsCount}
				postsCount={postsCount}
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
