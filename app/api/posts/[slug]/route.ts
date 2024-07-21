import { notFound } from 'next/navigation';
import { getPostById, type TPosts } from '@service/posts';

const GET = async (
	_request: Request,
	{ params }: { params: { slug: TPosts['id'] } }
) => {
	const slug = params.slug;
	const data = await getPostById(slug);

	if (!data) {
		notFound();
	}

	return Response.json({ data });
};

export { GET };
