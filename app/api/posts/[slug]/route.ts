import { NextRequest, NextResponse } from 'next/server';
import { notFound } from 'next/navigation';

import { getPostById } from '@service/posts';

const GET = async (
	request: NextRequest,
	{ params }: { params: { slug: string } }
) => {
	const { searchParams } = new URL(request.url);
	const queryValue = searchParams.get('withNav') || true;

	const data = await getPostById(Number(params.slug), Boolean(queryValue));

	if (!data) {
		notFound();
	}

	return NextResponse.json({ data });
};

export { GET };
