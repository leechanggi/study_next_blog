import * as z from 'zod';

const MAX_FILE_SIZE = 40000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', ', image/gif', 'image/webp'];

type TImagesSchema = {
	imgSrc?: FileList;
};

const ImagesSchema = z.object({
	imgSrc: z
		.any()
		.refine((files: FileList) => files.length > 0, {
			message: '이미지 파일은 필수입력 항목입니다.',
		})
		.refine(
			(files: FileList) => {
				console.log(files);
				console.log(Array.from(files));
				return Array.from(files).every(file => ACCEPTED_IMAGE_TYPES.includes(file.type));
			},
			{
				message: '.jpeg, .jpg, .png, .gif, .webp 형식의 이미지만 업로드 가능합니다.',
			}
		)
		.refine((files: FileList) => Array.from(files).every(file => file.size <= MAX_FILE_SIZE), {
			message: '파일 크기는 최대 5MB까지 지원됩니다.',
		}),
});

export type { TImagesSchema };
export default ImagesSchema;
