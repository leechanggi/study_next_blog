import { NextRequest, NextResponse } from 'next/server';
import { emailExists } from '@/service/user';

const POST = async (req: NextRequest) => {
	try {
		const { email } = await req.json();

		if (!email || typeof email !== 'string') {
			return NextResponse.json(
				{ message: 'Invalid email address' },
				{ status: 400 }
			);
		}

		const userExists = await emailExists(email);

		return NextResponse.json({ exists: userExists }, { status: 200 });
	} catch (error) {
		console.error('Error checking user existence:', error);
		return NextResponse.json(
			{ message: 'Failed to check user existence' },
			{ status: 500 }
		);
	}
};

export { POST };
