import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { splitComma } from '@/lib';

const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || '';
const clientSecret = process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET || '';
const admin = process.env.NEXT_PUBLIC_GITHUB_ADMIN || '';

const options: NextAuthOptions = {
	providers: [GithubProvider({ clientId, clientSecret })],
	secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
	session: { strategy: 'jwt', maxAge: 60 * 5 * 15 },
	callbacks: {
		jwt: async props => {
			const { token, user } = props;
			if (user) {
				const adminAccounts = splitComma(admin);
				if (token.email && adminAccounts.includes(token.email)) {
					token.role = 'admin';
				} else {
					token.role = 'user';
				}
			}
			return token;
		},
		session: async ({ session, token }) => {
			if (token) {
				session.user.id = token.id;
				session.user.role = token.role;
			}
			return session;
		},
	},
};

const authHandler = NextAuth(options);

export { authHandler as GET, authHandler as POST };
