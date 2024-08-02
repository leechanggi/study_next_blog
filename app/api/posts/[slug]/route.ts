import { NextRequest, NextResponse } from 'next/server';
import { notFound } from 'next/navigation';
import { getPostById } from '@service/posts';

const GET = async (
	_request: NextRequest,
	{ params }: { params: { slug: string } }
) => {
	const slug = params.slug;
	const data = await getPostById(Number(slug));

	if (!data) {
		notFound();
	}

	return NextResponse.json({ data });
};

export { GET };
