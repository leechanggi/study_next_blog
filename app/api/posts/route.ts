import { NextResponse } from 'next/server';
import { notFound } from 'next/navigation';

import { getPosts } from '@service/posts';

const GET = async () => {
	const data = await getPosts();

	if (!data) {
		notFound();
	}

	return NextResponse.json({ data });
};

export { GET };
