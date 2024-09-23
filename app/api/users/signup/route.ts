import { NextRequest, NextResponse } from 'next/server';
import { signup } from '@/service/user';

export const POST = async (req: NextRequest) => {
	try {
		const { email, password } = await req.json();

		if (!email || !password) {
			return NextResponse.json(
				{ message: 'Email and password are required' },
				{ status: 400 }
			);
		}

		if (typeof email !== 'string' || typeof password !== 'string') {
			return NextResponse.json(
				{ message: 'Invalid email or password format' },
				{ status: 400 }
			);
		}

		const newUser = await signup(email, password);

		if (!newUser) {
			return NextResponse.json({ message: 'Signup failed' }, { status: 500 });
		}

		return NextResponse.json(
			{
				id: newUser.id,
				email: newUser.email,
				role: newUser.role,
				permissions: newUser.permissions,
				createdAt: newUser.createdAt,
				updatedAt: newUser.updatedAt,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error('Error during signup:', error);
		return NextResponse.json({ message: 'Signup failed' }, { status: 500 });
	}
};
