import { notFound } from 'next/navigation';
import { getPostById } from '@service/posts';

const GET = async (
	_request: Request,
	{ params }: { params: { slug: string } }
) => {
	const slug = params.slug;
	const data = await getPostById(Number(slug));

	if (!data) {
		notFound();
	}

	return Response.json({ data });
};

export { GET };
