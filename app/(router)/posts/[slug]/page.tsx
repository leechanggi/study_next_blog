import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { RxCalendar } from 'react-icons/rx';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';

import { cn, formatDate, splitComma } from '@lib';
import { TPostsWithNav, TPosts } from '@service/posts';
import { Button, Markdown, PostNavigator } from '@components';

const revalidate = 86400;
const apiUrl = process.env.NEXT_PUBLIC_API_HOST || '';
const headers = {
	'Cache-Control': `max-age=${revalidate},stale-while-revalidate=604800`, // 7일
};

const generateStaticParams = async () => {
	const url = `${apiUrl}/api/posts`;

	try {
		const response = await axios.get(url, { headers });
		const { data: posts } = response.data;
		const slugs = posts.map((post: TPosts) => ({
			slug: post.post_id.toString(),
		}));
		return slugs;
	} catch (error) {
		console.error('Error fetching posts for static params:', error);
		return [];
	}
};

const generateMetadata = async ({ params }: { params: { slug: string } }) => {
	const { slug: id } = params;
	const { title } = await getPostById(id);

	return {
		title,
	};
};

const getPostById = async (id: string) => {
	const url = `${apiUrl}/api/posts/${id}`;

	try {
		const response = await axios.get(url, { headers });
		const post = response.data.data as TPostsWithNav;
		return post;
	} catch (error) {
		console.error('Error fetching post:', error);
		throw new Error(
			'요청한 게시물을 찾을 수 없습니다. 나중에 다시 시도해주세요.'
		);
	}
};

const SlugPage = async ({ params }: { params: { slug: string } }) => {
	const { slug: id } = params;
	const res = await getPostById(id);

	if (!res) {
		return notFound();
	}

	const { title, content, createdAt, tags, imgSrc, prev, next } = res;
	const { year, month, day } = formatDate(createdAt);

	return (
		<>
			{imgSrc && (
				<div className='mb-8'>
					<AspectRatio.Root
						ratio={21.3 / 9}
						className='overflow-hidden rounded-lg'
					>
						<Image
							src={imgSrc}
							alt={title}
							width={736}
							height={311}
							className={cn('w-full')}
							priority
						/>
					</AspectRatio.Root>
				</div>
			)}

			<article>
				<h2 className='text-4xl font-medium ellipsis-2'>{title}</h2>

				<span className='flex items-center justify-end mt-8 text-base text-zinc-600 dark:text-zinc-200'>
					<RxCalendar size='1.25em' />
					<span className='pl-1'>{`${year}년 ${month}월 ${day}일`}</span>
				</span>

				{splitComma(tags) && (
					<div className='flex flex-wrap gap-4 mt-8'>
						{splitComma(tags).map(tag => (
							<Button
								key={tag}
								variant='secondary'
								className='rounded-full'
								asChild
							>
								<Link href={{ pathname: '/', query: { tag } }}>#{tag}</Link>
							</Button>
						))}
					</div>
				)}

				<Markdown className='mt-20'>{content}</Markdown>
			</article>

			<PostNavigator prev={prev} next={next} />
		</>
	);
};

export { generateStaticParams, generateMetadata };
export default SlugPage;
