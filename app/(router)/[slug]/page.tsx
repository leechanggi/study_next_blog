import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { RxCalendar } from 'react-icons/rx';

import { formatDate } from '@lib';
import { type TPosts, getPosts } from '@service/posts';

const generateStaticParams = async () => {
	const posts = await getPosts();
	const slugs = posts.map(post => post.id);
	return slugs.map(slug => ({ slug }));
};

const SlugPage = async ({ params }: { params: { slug: TPosts['id'] } }) => {
	const { slug: id } = params;

	const apiUrl = process.env.NEXT_PUBLIC_API_HOST;
	const res = await fetch(`${apiUrl}/api/posts/${id}`, {
		next: { revalidate: 0 },
	});
	const { data: post }: { data: TPosts } = await res.json();

	if (!res) {
		return notFound();
	}

	const { year, month, day } = formatDate(post.createdAt);

	return (
		<>
			<h2 className='mb-6 text-4xl font-bold ellipsis-2'>{post.title}</h2>
			<span className='flex items-center text-sm text-neutral-600 dark:text-neutral-200'>
				<RxCalendar size='1.25em' />
				<span className='pl-1'>{`${year}년 ${month}월 ${day}일`}</span>
			</span>
			<div>
				<ReactMarkdown
					components={{
						// 코드를 어떻게 표현할지에 대한 내용
						code({ node, inline, className, children, ...props }) {
							// markdown에 사용된 언어
							const match = /language-(\w+)/.exec(className || '');
							// 사용된 언어가 표시되어있는 경우
							return !inline && match ? (
								<SyntaxHighlighter
									{...props}
									style={dark}
									language={match[1]}
									PreTag='div'
								>
									{String(children).replace(/\n$/, '')}
								</SyntaxHighlighter>
							) : (
								// 사용된 언어를 따로 적지 않거나 적합하지 않을 경우
								<code {...props} className={className}>
									{children}
								</code>
							);
						},
						// nextjs의 경우 img를 Image 컴포넌트로 바꿔줌
						img: image => (
							<Image
								src={image.src || ''}
								alt={image.alt || ''}
								width={500}
								height={350}
							/>
						),
					}}
				>
					{post.content}
				</ReactMarkdown>
			</div>
		</>
	);
};

export { generateStaticParams };
export default SlugPage;
