import prisma from '../../prisma/client';

type TPosts = {
	id: number;
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

type TControllablePosts = Omit<TPosts, 'id' | 'createdAt' | 'updatedAt'>;

const getPosts = async (withSkip: boolean = false): Promise<TPosts[]> => {
	const data = await prisma.post.findMany({
		where: withSkip ? {} : { skip: false },
		orderBy: [
			{
				id: 'desc',
			},
		],
	});

	return data;
};

const getPostById = async (
	id: TPosts['id'],
	withNav: boolean = false,
	withSkip: boolean = false
): Promise<TPosts | TPostsWithNav | null> => {
	const postFilter = { id: id, ...(withSkip ? {} : { skip: false }) };

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
				id: { lt: id },
				...navigationFilter,
			},
			orderBy: { id: 'desc' },
		}),
		prisma.post.findFirst({
			where: {
				id: { gt: id },
				...navigationFilter,
			},
			orderBy: { id: 'asc' },
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
	id: TPosts['id'],
	data: Partial<TControllablePosts>
): Promise<TPosts | null> => {
	const updatedPost = await prisma.post.update({
		where: { id: id },
		data: {
			...data,
			updatedAt: new Date(),
		},
	});

	return updatedPost;
};

const deletePostById = async (id: TPosts['id']): Promise<TPosts | null> => {
	const deletedPost = await prisma.post.delete({
		where: { id: id },
	});

	return deletedPost;
};

export type { TPosts, TPostsWithNav, TControllablePosts };
export { getPosts, getPostById, createPost, updatePostById, deletePostById };
