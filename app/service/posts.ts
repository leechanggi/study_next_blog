import prisma from '@/prisma/client';

type TPosts = {
	post_id: number;
	title: string;
	description: string;
	content: string;
	createdAt: Date;
	updatedAt: Date | null;
	tags: string | null;
	imgSrc: string | null;
	skip: boolean;
};

type TPostsWithNav = {
	prev: TPosts | null;
	next: TPosts | null;
} & TPosts;

const getPosts = async (): Promise<TPosts[]> => {
	const data = await prisma.post.findMany({
		where: { skip: false },
		orderBy: [
			{
				post_id: 'desc',
			},
		],
	});
	return data;
};

const getPostById = async (
	postId: TPosts['post_id'],
	withNav?: Boolean
): Promise<TPosts | TPostsWithNav | null> => {
	const post = await prisma.post.findUnique({
		where: { post_id: postId, skip: false },
	});

	if (!post) {
		return null;
	}

	if (!withNav) {
		return {
			...post,
		};
	}

	const previousPost = await prisma.post.findFirst({
		where: {
			post_id: {
				lt: postId,
			},
			skip: false,
		},
		orderBy: {
			post_id: 'desc',
		},
	});

	const nextPost = await prisma.post.findFirst({
		where: {
			post_id: {
				gt: postId,
			},
			skip: false,
		},
		orderBy: {
			post_id: 'asc',
		},
	});

	return {
		...post,
		prev: previousPost || null,
		next: nextPost || null,
	};
};

export type { TPosts, TPostsWithNav };
export { getPosts, getPostById };
