import { NextRequest, NextResponse } from 'next/server';
import { notFound } from 'next/navigation';

import { getUserById, updateUserById, TControllableUser } from '@/service/user';

const GET = async (_request: NextRequest, { params }: { params: { slug: string } }) => {
	const data = await getUserById(params.slug);

	if (!data) {
		notFound();
	}

	return NextResponse.json({ data });
};

const PUT = async (request: NextRequest, { params }: { params: { slug: string } }) => {
	const id = params.slug;
	const body = await request.json();
	const data = await updateUserById(id, body as TControllableUser);

	if (!data) {
		notFound();
	}

	return NextResponse.json({ data });
};

export { GET, PUT };
