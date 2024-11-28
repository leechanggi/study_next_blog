export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { permissions } from '@/service/user';

const GET = async (req: NextRequest) => {
	try {
		const { searchParams } = new URL(req.url);
		const email = searchParams.get('email');

		if (!email || typeof email !== 'string') {
			return NextResponse.json({ message: 'Invalid email address' }, { status: 400 });
		}

		const userPermissions = await permissions(email);

		return NextResponse.json(userPermissions, { status: 200 });
	} catch (error) {
		console.error('Error retrieving user permissions:', error);
		return NextResponse.json({ message: 'Failed to retrieve user permissions' }, { status: 500 });
	}
};

export { GET };
