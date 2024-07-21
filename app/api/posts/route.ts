import { getPosts } from '@service/posts';

const GET = async () => {
	const data = await getPosts();
	return Response.json({ data });
};

export { GET };
