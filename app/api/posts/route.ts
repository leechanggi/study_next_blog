import { NextRequest, NextResponse } from 'next/server';
import { notFound } from 'next/navigation';

import { getPosts, createPost } from '@/service/post';

const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const withSkip = searchParams.get('withSkip') === 'true';
	const data = await getPosts(withSkip);

	if (!data) {
		return notFound();
	}

	return NextResponse.json({ data });
};

const POST = async (request: NextRequest) => {
	try {
		const body = await request.json();
		const { title, description, content, tags, imgSrc, skip } = body;

		if (!title || !description || !content || !imgSrc) {
			return NextResponse.json(
				{
					message:
						'게시물의 제목, 설명, 내용, 대표 이미지는 필수입력 항목 입니다.',
				},
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
			authorId: '',
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
