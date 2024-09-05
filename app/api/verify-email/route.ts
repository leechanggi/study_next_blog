import { NextRequest, NextResponse } from 'next/server';
import { sendVerificationEmail, verifyEmail } from '@/service/verifyEmail';

const GET = async (request: NextRequest) => {
	try {
		const { searchParams } = new URL(request.url);
		const token = searchParams.get('token');
		const email = searchParams.get('email');

		if (!token || !email) {
			return NextResponse.json(
				{ message: 'Invalid or missing token/email' },
				{ status: 400 }
			);
		}

		await verifyEmail({ token, email });

		return NextResponse.json(
			{ message: 'Email successfully verified' },
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error verifying email:', error);
		return NextResponse.json(
			{ message: 'Failed to verify email', error },
			{ status: 500 }
		);
	}
};

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

		await sendVerificationEmail({ email });

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

export { GET, POST };
