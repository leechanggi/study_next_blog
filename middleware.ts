import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { match } from 'path-to-regexp';

const secret = process.env.NEXT_PUBLIC_AUTH_SECRET || '';
const baseURL = process.env.NEXT_PUBLIC_API_HOST || '';

const matchersPageAdmin = ['/admin', '/admin/*'];

const matchersApi = ['/api', '/api/*'];
const matchersApiAuth = ['/api/auth', '/api/auth/*'];

const isMatch = (pathname: string, urls: string[]) => {
	return urls.some(url => !!match(url)(pathname));
};

const middleware = async (request: NextRequest) => {
	const token = await getToken({ req: request, secret });

	if (isMatch(request.nextUrl.pathname, matchersPageAdmin)) {
		if (!token || token.role !== 'admin') {
			return NextResponse.redirect(new URL('/', baseURL));
		}
		return NextResponse.next();
	}

	// API
	if (!isMatch(request.nextUrl.pathname, matchersApi)) {
		return NextResponse.next();
	}

	if (!isMatch(request.nextUrl.pathname, matchersApiAuth)) {
		if (!token && request.method === 'POST') {
			return NextResponse.json(
				{ error: 'Unauthorized, no access token provided' },
				{ status: 401 }
			);
		}
		return NextResponse.next();
	}

	return NextResponse.next();
};

export { middleware };
