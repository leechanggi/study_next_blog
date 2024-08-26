import prisma from '../../prisma/client';

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

type TControllablePosts = Omit<TPosts, 'post_id' | 'createdAt' | 'updatedAt'>;

const getPosts = async (withSkip: boolean = false): Promise<TPosts[]> => {
	const data = await prisma.post.findMany({
		where: withSkip ? {} : { skip: false },
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
	withNav: boolean = false,
	withSkip: boolean = false
): Promise<TPosts | TPostsWithNav | null> => {
	const postFilter = { post_id: postId, ...(withSkip ? {} : { skip: false }) };

	const post = await prisma.post.findUnique({
		where: postFilter,
	});

	if (!post) {
		return null;
	}

	if (!withNav) {
		return post;
	}

	const navigationFilter = {
		...(withSkip ? {} : { skip: false }),
	};

	const [previousPost, nextPost] = await Promise.all([
		prisma.post.findFirst({
			where: {
				post_id: { lt: postId },
				...navigationFilter,
			},
			orderBy: { post_id: 'desc' },
		}),
		prisma.post.findFirst({
			where: {
				post_id: { gt: postId },
				...navigationFilter,
			},
			orderBy: { post_id: 'asc' },
		}),
	]);

	return {
		...post,
		prev: previousPost || null,
		next: nextPost || null,
	};
};

const createPost = async (data: TControllablePosts): Promise<TPosts> => {
	const newPost = await prisma.post.create({
		data: {
			...data,
			createdAt: new Date(),
		},
	});

	return newPost;
};

const updatePostById = async (
	postId: TPosts['post_id'],
	data: Partial<TControllablePosts>
): Promise<TPosts | null> => {
	const updatedPost = await prisma.post.update({
		where: { post_id: postId },
		data: {
			...data,
			updatedAt: new Date(),
		},
	});

	return updatedPost;
};

const deletePostById = async (
	postId: TPosts['post_id']
): Promise<TPosts | null> => {
	const deletedPost = await prisma.post.delete({
		where: { post_id: postId },
	});

	return deletedPost;
};

export type { TPosts, TPostsWithNav, TControllablePosts };
export { getPosts, getPostById, createPost, updatePostById, deletePostById };
