import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const options: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { label: 'Username', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				return null;
			},
		}),
	],
	// secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
	// session: { strategy: 'jwt', maxAge: 60 * 5 * 15 },
	// callbacks: {
	// 	jwt: async props => {
	// 		const { token, user } = props;
	// 		if (user) {
	// 			const adminAccounts = splitComma(admin);
	// 			if (token.email && adminAccounts.includes(token.email)) {
	// 				token.role = 'admin';
	// 			} else {
	// 				token.role = 'user';
	// 			}
	// 		}
	// 		return token;
	// 	},
	// 	session: async ({ session, token }) => {
	// 		if (token) {
	// 			session.user.id = token.id;
	// 			session.user.role = token.role;
	// 		}
	// 		return session;
	// 	},
	// },
};

const authHandler = NextAuth(options);

export { authHandler as GET, authHandler as POST };
