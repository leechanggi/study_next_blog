import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { login } from '@/service/user';

const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					console.error('이메일 또는 비밀번호가 제공되지 않았습니다.');
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
						console.error('사용자를 찾을 수 없습니다.');
						return null;
					}
				} catch (error) {
					console.error(
						'로그인 중 오류가 발생했습니다:',
						error instanceof Error ? error.message : '알 수 없는 오류'
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
					id: token.id,
					email: token.email,
					role: token.role,
					permissions: token.permissions,
				};
			}
			return session;
		},
	},
	pages: {
		signIn: '/auth/login',
		error: '/auth/error',
	},
};

export default authOptions;
