import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login } from '@/service/user';

const options: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' },
			},
			async authorize(credentials, _req) {
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
					console.error('Error during login:', error);
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
				session.user.id = token.id;
				session.user.email = token.email;
				session.user.role = token.role;
				session.user.permissions = token.permissions;
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
