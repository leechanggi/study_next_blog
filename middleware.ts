import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { match } from 'path-to-regexp';

const baseURL = process.env.NEXT_PUBLIC_API_HOST || '';

const matchersPageAdmin = ['/admin', '/admin/*'];
const matchersApi = ['/api', '/api/*'];
const matchersApiAuth = ['/api/auth', '/api/auth/*'];

const isMatch = (pathname: string, urls: string[]) => {
	return urls.some(url => !!match(url)(pathname));
};

const middleware = async (request: NextRequest, response: NextResponse) => {
	// const session = await getServerSession(authOptions);

	// const session = await getServerSession(authOptions);
	// console.log(session);

	// if (isMatch(request.nextUrl.pathname, matchersPageAdmin)) {
	// 	if (session && session.user.role === 'admin') {
	// 		return NextResponse.next();
	// 	}
	// 	return NextResponse.redirect(new URL('/', baseURL));
	// }

	// API
	// if (!isMatch(request.nextUrl.pathname, matchersApi)) {
	// 	return NextResponse.next();
	// }

	// if (!isMatch(request.nextUrl.pathname, matchersApiAuth)) {
	// 	if (!session && request.method === 'POST') {
	// 		return NextResponse.json(
	// 			{ error: 'Unauthorized, no access token provided' },
	// 			{ status: 401 }
	// 		);
	// 	}
	// 	return NextResponse.next();
	// }

	return NextResponse.next();
};

export { middleware };
