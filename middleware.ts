import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { match } from 'path-to-regexp';

const secret = process.env.NEXTAUTH_SECRET;
const baseURL = process.env.NEXT_PUBLIC_API_HOST || '';

const matchersPageAdmin = ['/admin', '/admin/*'];
const matchersAuthAdmin = ['/auth', '/auth/*'];

const isMatch = (pathname: string, urls: string[]) => {
	return urls.some(url => !!match(url)(pathname));
};

const middleware = async (request: NextRequest, response: NextResponse) => {
	const token = await getToken({ req: request, secret });
	const role = token?.role;

	if (isMatch(request.nextUrl.pathname, matchersAuthAdmin)) {
		if (role) {
			return NextResponse.redirect(new URL('/', baseURL));
		}
		return NextResponse.next();
	}

	if (isMatch(request.nextUrl.pathname, matchersPageAdmin)) {
		if (role !== 'admin') {
			return NextResponse.redirect(new URL('/', baseURL));
		}
		return NextResponse.next();
	}

	return NextResponse.next();
};

export { middleware };
