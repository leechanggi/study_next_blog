import * as z from 'zod';

type TImagesSchema = {
	imgSrc: string;
};

const ImagesSchema = z.object({
	imgSrc: z.string(),
});

export type { TImagesSchema };
export default ImagesSchema;
