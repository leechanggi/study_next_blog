import { NextResponse } from 'next/server';
import { notFound } from 'next/navigation';

import { getPosts, createPost } from '@/service/posts';

const GET = async () => {
	const data = await getPosts();

	if (!data) {
		notFound();
	}

	return NextResponse.json({ data });
};

const POST = async (req: Request) => {
	try {
		const body = await req.json();
		const { title, description, content, tags, imgSrc, skip } = body;

		if (!title || !description || !content) {
			return NextResponse.json(
				{ message: 'Title, description and content are required' },
				{ status: 400 }
			);
		}

		const data = await createPost({
			title,
			description,
			content,
			tags,
			imgSrc,
			skip,
		});

		return NextResponse.json({ data }, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ message: 'Failed to create post', error },
			{ status: 500 }
		);
	}
};

export { GET, POST };
