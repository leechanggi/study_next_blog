import { NextRequest, NextResponse } from 'next/server';
import { requestEmail } from '@/service/verificationToken';

const POST = async (request: NextRequest) => {
	try {
		const body = await request.json();
		const { email } = body;

		if (!email || typeof email !== 'string') {
			return NextResponse.json(
				{ message: 'Invalid email address' },
				{ status: 400 }
			);
		}

		await requestEmail({ email });

		return NextResponse.json(
			{ message: 'Verification email sent' },
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error sending verification email:', error);

		return NextResponse.json(
			{ message: 'Failed to send verification email' },
			{ status: 500 }
		);
	}
};

export { POST };
