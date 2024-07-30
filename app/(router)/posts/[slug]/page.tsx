import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { RxCalendar } from 'react-icons/rx';

import { formatDate, splitComma } from '@lib';
import { type TPosts } from '@service/posts';
import { Button, Markdown } from '@components';

const dynamic = 'error';
const dynamicParams = true;
const revalidate = 60;
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

	const { data: post }: { data: TPosts } = await res.json();
	const { year, month, day } = formatDate(post.createdAt);

	return (
		<>
			<h2 className='text-5xl font-bold ellipsis-2'>{post.title}</h2>
			<span className='flex items-center justify-end mt-8 text-base text-zinc-600 dark:text-zinc-200'>
				<RxCalendar size='1.25em' />
				<span className='pl-1'>{`${year}년 ${month}월 ${day}일`}</span>
			</span>
			{splitComma(post.tags) && (
				<div className='flex flex-wrap gap-4 mt-8'>
					{splitComma(post.tags).map(tag => (
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
			<Markdown className='mt-20'>{post.content}</Markdown>
		</>
	);
};

export { dynamic, dynamicParams, generateStaticParams };
export default SlugPage;
