import { NextRequest, NextResponse } from 'next/server';
import { notFound } from 'next/navigation';

import { getViews } from '@/service/views';

const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const postId = searchParams.get('postId');

	const data = await getViews(Number(postId));

	if (!data) {
		notFound();
	}

	return NextResponse.json({ data });
};

export { GET };
