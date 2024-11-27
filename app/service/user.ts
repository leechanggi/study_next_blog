import bcrypt from 'bcryptjs';
import prisma from '@prismaClient';
import { InputJsonValue, JsonValue } from '@prisma/client/runtime/library';

type TPermissions = {
	role: 'user' | 'admin';
	permissions: {
		manageUser: {
			create: boolean;
			read: boolean;
			update: boolean;
			delete: boolean;
		};
		managePost: {
			create: boolean;
			read: boolean;
			update: boolean;
			delete: boolean;
		};
	};
};

type TUser = {
	id: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
} & TPermissions;

type TUserTable = {
	userPermissions: TUser['permissions']['manageUser'];
	postPermissions: TUser['permissions']['managePost'];
} & Omit<TUser, 'permissions'>;

type TControllableUser = Omit<TUser, 'password' | 'createdAt' | 'updatedAt'>;

type TVerificationToken = {
	id: string;
	email: string;
	token: string;
	createdAt: Date;
	expiresAt: Date;
};

const saltRounds = parseInt(process.env.NEXT_PUBLIC_BCRYPT_ROUNDS || '16', 10);

const hashPassword = async (password: TUser['password']): Promise<string> => {
	const salt = await bcrypt.genSalt(saltRounds);
	return bcrypt.hash(password, salt);
};

const emailExists = async (email: TUser['email']): Promise<boolean> => {
	const user = await prisma.user.findUnique({ where: { email } });
	return !!user;
};

const permissions = async (email: TUser['email']): Promise<TPermissions> => {
	const data = await prisma.user.findUnique({
		where: { email },
		select: {
			role: true,
			permissions: true,
		},
	});
	if (!data) {
		throw new Error('Cannot find a user with the specified email.');
	}

	const { role, permissions } = data as TPermissions;

	return {
		role,
		permissions,
	};
};

const signup = async (email: string, password: string): Promise<TUser | null> => {
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
			role: newUser.role as TPermissions['role'],
			permissions: newUser.permissions as TPermissions['permissions'],
		};
	} catch (error) {
		console.error('Error during signup:', error);
		throw new Error('Signup failed');
	}
};

const login = async (email: string, password: string): Promise<TUser | null> => {
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
			role: user.role as TPermissions['role'],
			permissions: user.permissions as TPermissions['permissions'],
		};
	} catch (error) {
		console.error('Error during login:', error);
		throw new Error('Login failed');
	}
};

const getUsers = async (): Promise<TUser[] | null> => {
	const data = await prisma.user.findMany({
		orderBy: [
			{
				id: 'desc',
			},
		],
	});

	return data as TUser[];
};

const getUserById = async (id: TUser['id']): Promise<TUser | null> => {
	const userFilter = { id };
	const data = await prisma.user.findUnique({
		where: userFilter,
	});

	return data as TUser;
};

const updateUserById = async (id: TUser['id'], data: Partial<TControllableUser>): Promise<TUser | null> => {
	const permissions = data.permissions ? (data.permissions as InputJsonValue) : undefined;

	const updatedUser = await prisma.user.update({
		where: { id },
		data: {
			...data,
			permissions,
			updatedAt: new Date(),
		},
	});

	return {
		...updatedUser,
		permissions: updatedUser.permissions as TPermissions['permissions'],
	};
};

export type { TPermissions, TUser, TUserTable, TVerificationToken, TControllableUser };
export { hashPassword, emailExists, permissions, signup, login, getUsers, getUserById, updateUserById };
