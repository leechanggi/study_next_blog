import { NextRequest, NextResponse } from 'next/server';
import { notFound } from 'next/navigation';

import { getUsers } from '@/service/user';

const GET = async (_request: NextRequest) => {
	const data = await getUsers();

	if (!data) {
		return notFound();
	}

	return NextResponse.json({ data });
};

export { GET }