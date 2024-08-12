import prisma from '@/prisma/client';

type TViews = {
	view_id: number;
	post_id: number;
	createdAt: Date;
	duration: number;
};

const getViews = async (
	postId: TViews['post_id'] | null
): Promise<TViews[]> => {
	const data = await prisma.view.findMany({
		where: postId ? { post_id: postId } : undefined,
		orderBy: [
			{
				view_id: 'desc',
			},
		],
	});
	return data;
};

export type { TViews };
export { getViews };
