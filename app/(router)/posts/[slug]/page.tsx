import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { RxCalendar } from 'react-icons/rx';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';

import { cn, formatDate, splitComma } from '@lib';
import { TPostsWithNav, TPosts } from '@service/posts';
import { Button, Markdown, PostNavigator } from '@components';

const dynamic = 'error';
const dynamicParams = true;
const revalidate = 0;
const apiUrl = process.env.NEXT_PUBLIC_API_HOST;

const generateStaticParams = async () => {
	const res = await fetch(`${apiUrl}/api/posts`);
	const { data: posts }: { data: TPosts[] } = await res.json();
	const slugs = posts.map(post => post.post_id.toString());
	return slugs.map(slug => ({ slug }));
};

const SlugPage = async ({ params }: { params: { slug: string } }) => {
	const { slug: id } = params;

	const res = await fetch(`${apiUrl}/api/posts/${id}`, {
		next: { revalidate },
	});

	if (!res) {
		return notFound();
	}

	const { data: post }: { data: TPostsWithNav } = await res.json();
	const { title, content, createdAt, tags, imgSrc, prev, next } = post;
	const { year, month, day } = formatDate(createdAt);

	const isValidURL = (url: string) => {
		try {
			new URL(url);
			return true;
		} catch (e) {
			return false;
		}
	};

	return (
		<>
			{imgSrc && isValidURL(imgSrc) && (
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

export { dynamic, dynamicParams, generateStaticParams };
export default SlugPage;