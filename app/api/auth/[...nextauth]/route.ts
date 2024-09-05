import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login } from '@/service/user';

const options: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: '이메일', type: 'text' },
				password: { label: '비밀번호', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials) {
					return null;
				}

				const { email, password } = credentials;

				try {
					const user = await login(email, password);

					if (user) {
						return {
							id: user.id,
							email: user.email,
							role: user.role,
							permissions: user.permissions,
						};
					} else {
						return null;
					}
				} catch (error) {
					console.error(
						'로그인 중 오류 발생:',
						error instanceof Error ? error.message : error
					);
					return null;
				}
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.email = user.email;
				token.role = user.role;
				token.permissions = user.permissions;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user = {
					id: token.id as string,
					email: token.email as string,
					role: token.role as string,
					permissions: token.permissions as any,
				};
			}
			return session;
		},
	},
	pages: {
		signIn: '/auth/signin',
		error: '/auth/error',
	},
};

export default options;
