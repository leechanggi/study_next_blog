import prisma from '@/prisma/client';

type TPosts = {
	post_id: number;
	title: string;
	content: string;
	createdAt: Date;
	updatedAt: Date | null;
	tags: string | null;
	imgSrc: string | null;
};

const getPosts = async (): Promise<TPosts[]> => {
	const posts = await prisma.post.findMany();
	return posts;
};

const getPostById = async (
	postId: TPosts['post_id']
): Promise<TPosts | null> => {
	const post = await prisma.post.findUnique({
		where: { post_id: postId },
	});
	return post;
};

export type { TPosts };
export { getPosts, getPostById };
