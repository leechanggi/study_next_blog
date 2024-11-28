import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { RxCalendar } from 'react-icons/rx';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';

import { cn, formatDate, splitComma, getPosts, getPostById } from '@/lib';
import { TPostsWithNav, TPosts } from '@/service/post';
import { Button, Markdown, PostNavigator } from '@/components';

const revalidate = 86400;

const generateStaticParams = async () => {
	try {
		const posts = await getPosts();
		const slugs = posts.map((post: TPosts) => ({
			slug: post.id.toString(),
		}));
		return slugs;
	} catch (error) {
		console.error('Error fetching posts for static params:', error);
		return [];
	}
};

const generateMetadata = async ({ params }: { params: { slug: string } }) => {
	const { slug: id } = params;
	const { title } = await getPostById(parseInt(id));

	return {
		title,
	};
};

const PostsSlugPage = async ({ params }: { params: { slug: string } }) => {
	const { slug: id } = params;
	const data = await getPostById(parseInt(id), true);

	if (!data) {
		return notFound();
	}

	const { title, content, createdAt, tags, imgSrc, prev, next } = data as TPostsWithNav;
	const { year, month, day } = formatDate(createdAt);

	return (
		<>
			{imgSrc && (
				<div className='mb-8'>
					<AspectRatio.Root ratio={21.3 / 9} className='overflow-hidden rounded-lg'>
						<Image src={imgSrc} alt={title} width={736} height={311} className={cn('w-full')} priority />
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
							<Button key={tag} variant='secondary' className='rounded-full' asChild>
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

export { revalidate, generateStaticParams, generateMetadata };
export default PostsSlugPage;
