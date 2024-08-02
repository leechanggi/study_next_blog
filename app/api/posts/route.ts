import { NextResponse } from 'next/server';
import { getPosts } from '@service/posts';

const GET = async () => {
	const data = await getPosts();

	return NextResponse.json({ data });
};

export { GET };
