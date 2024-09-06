import bcrypt from 'bcrypt';
import prisma from '@prismaClient';
import { JsonValue } from '@prisma/client/runtime/library';

type TUser = {
	id: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
	role: 'user' | 'admin';
	permissions: JsonValue;
};

type TVerificationToken = {
	id: string;
	email: string;
	token: string;
	createdAt: Date;
	expiresAt: Date;
};

const saltRounds = parseInt(process.env.NEXT_PUBLIC_BCRYPT_ROUNDS || '10', 10);

const hashPassword = async (password: string): Promise<string> => {
	const salt = await bcrypt.genSalt(saltRounds);
	return bcrypt.hash(password, salt);
};

const emailExists = async (email: string): Promise<boolean> => {
	const user = await prisma.user.findUnique({ where: { email } });
	return !!user;
};

const signup = async (
	email: string,
	password: string
): Promise<TUser | null> => {
	try {
		const userExists = await emailExists(email);

		if (userExists) {
			throw new Error('This email is already registered.');
		}

		const hashedPassword = await hashPassword(password);

		const newUser = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				role: 'user',
				permissions: {
					manageUser: {
						create: false,
						read: false,
						update: false,
						delete: false,
					},
					managePost: {
						create: false,
						read: false,
						update: false,
						delete: false,
					},
				},
			},
		});

		return {
			id: newUser.id,
			email: newUser.email,
			password: newUser.password,
			createdAt: newUser.createdAt,
			updatedAt: newUser.updatedAt,
			role: newUser.role as 'user' | 'admin',
			permissions: newUser.permissions,
		};
	} catch (error) {
		console.error('Error during signup:', error);
		throw new Error('Signup failed');
	}
};

const login = async (
	email: string,
	password: string
): Promise<TUser | null> => {
	try {
		const user = await prisma.user.findUnique({ where: { email } });

		if (!user) {
			throw new Error('User not found');
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw new Error('Invalid password');
		}

		return {
			id: user.id,
			email: user.email,
			password: user.password,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
			role: user.role as 'user' | 'admin',
			permissions: user.permissions,
		};
	} catch (error) {
		console.error('Error during login:', error);
		throw new Error('Login failed');
	}
};

export type { TUser, TVerificationToken };
export { hashPassword, emailExists, signup, login };
