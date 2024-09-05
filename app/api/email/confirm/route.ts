import { NextRequest, NextResponse } from 'next/server';
import { confirmEmail } from '@/service/verificationToken';

export const POST = async (req: NextRequest) => {
	try {
		const body = await req.json();
		const { email, token } = body;

		if (!email || !token) {
			return NextResponse.json(
				{ message: 'Email and token are required.' },
				{ status: 400 }
			);
		}

		const result = await confirmEmail({ email, token });

		return NextResponse.json(result, { status: 200 });
	} catch (error: any) {
		console.error('Email verification error:', error.message);
		return NextResponse.json(
			{ message: error.message || 'Email verification failed.' },
			{ status: 400 }
		);
	}
};
