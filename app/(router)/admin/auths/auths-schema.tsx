import * as z from 'zod';

type TAuthsSchema = {
	id: string;
	email: string;
	role: 'user' | 'admin';
	postPermissions: {
		create: boolean;
		read: boolean;
		update: boolean;
		delete: boolean;
	};
	userPermissions: {
		create: boolean;
		read: boolean;
		update: boolean;
		delete: boolean;
	};
};

const AuthsSchema = z.object({
	id: z.string(),
	email: z.string().email(),
	role: z.enum(['user', 'admin']),
	postPermissions: z.object({
		create: z.boolean(),
		read: z.boolean(),
		update: z.boolean(),
		delete: z.boolean(),
	}),
	userPermissions: z.object({
		create: z.boolean(),
		read: z.boolean(),
		update: z.boolean(),
		delete: z.boolean(),
	}),
});

export type { TAuthsSchema };
export default AuthsSchema;
