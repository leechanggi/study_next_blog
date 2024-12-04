import { NextRequest, NextResponse } from 'next/server';
import { notFound } from 'next/navigation';

import { getImages } from '@/service/image';

const GET = async (_request: NextRequest) => {
	const data = await getImages();

	if (!data) {
		return notFound();
	}

	return NextResponse.json({ data });
};

export { GET };
