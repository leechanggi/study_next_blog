import * as z from 'zod';

type TImagesSchema = {
	imgSrc: string;
};

const blockedWordsString = process.env.NEXT_PUBLIC_BLOCKED_WORDS || '';

const blockedWords = blockedWordsString
	.replace(/'/g, '')
	.split(',')
	.map(word => word.trim());

const ImagesSchema = z.object({
	imgSrc: z.string(),
});

export type { TImagesSchema };
export default ImagesSchema;
