import { NextRequest, NextResponse } from 'next/server';
import prisma from '@prismaClient';

export const POST = async (req: NextRequest) => {
	try {
		const { email } = await req.json();

		if (!email || typeof email !== 'string') {
			return NextResponse.json(
				{ message: 'Invalid email address' },
				{ status: 400 }
			);
		}

		const user = await prisma.user.findUnique({ where: { email } });
		const userExists = !!user;

		return NextResponse.json({ exists: userExists }, { status: 200 });
	} catch (error) {
		console.error('Error checking user existence:', error);
		return NextResponse.json(
			{ message: 'Failed to check user existence' },
			{ status: 500 }
		);
	}
};
