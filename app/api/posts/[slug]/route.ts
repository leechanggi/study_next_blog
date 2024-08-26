import { NextRequest, NextResponse } from 'next/server';
import { notFound } from 'next/navigation';

import {
	TControllablePosts,
	getPostById,
	updatePostById,
	deletePostById,
} from '@/service/posts';

const GET = async (
	request: NextRequest,
	{ params }: { params: { slug: string } }
) => {
	const { searchParams } = new URL(request.url);
	const withNav = searchParams.get('withNav') === 'true';
	const withSkip = searchParams.get('withSkip') === 'true';
	const data = await getPostById(Number(params.slug), withNav, withSkip);

	if (!data) {
		notFound();
	}

	return NextResponse.json({ data });
};

const PUT = async (
	request: NextRequest,
	{ params }: { params: { slug: string } }
) => {
	const postId = Number(params.slug);
	const body = await request.json();
	const data = await updatePostById(postId, body as TControllablePosts);

	if (!data) {
		notFound();
	}

	return NextResponse.json({ data });
};

const DELETE = async (
	_request: NextRequest,
	{ params }: { params: { slug: string } }
) => {
	const postId = Number(params.slug);
	const data = await deletePostById(postId);

	if (!data) {
		notFound();
	}

	return NextResponse.json({ data });
};

export { GET, PUT, DELETE };
