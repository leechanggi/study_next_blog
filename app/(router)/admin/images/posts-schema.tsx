import * as z from 'zod';

type TPostSchema = {
	title: string;
	description: string;
	content: string;
	tags: string;
	imgSrc: string;
	skip: boolean;
};

const blockedWordsString = process.env.NEXT_PUBLIC_BLOCKED_WORDS || '';

const blockedWords = blockedWordsString
	.replace(/'/g, '')
	.split(',')
	.map(word => word.trim());

const PostsSchema = z.object({
	title: z
		.string()
		.min(2, { message: '최소 2글자 이상 입력하세요.' })
		.max(16, { message: '최대 16글자 까지 입력가능합니다.' })
		.refine(val => !blockedWords.some(word => val.includes(word)), {
			message: '부적절한 단어가 포함되어 있습니다.',
		}),
	description: z
		.string()
		.min(2, { message: '최소 2글자 이상 입력하세요.' })
		.max(16, { message: '최대 16글자 까지 입력가능합니다.' })
		.refine(val => !blockedWords.some(word => val.includes(word)), {
			message: '부적절한 단어가 포함되어 있습니다.',
		}),
	content: z
		.string()
		.min(2, { message: '최소 2글자 이상 입력하세요.' })
		.max(3000, { message: '최대 3000글자 까지 입력가능합니다.' })
		.refine(val => !blockedWords.some(word => val.includes(word)), {
			message: '부적절한 단어가 포함되어 있습니다.',
		}),
	tags: z.string().min(1, { message: '태그는 필수 항목 입니다.' }),
	imgSrc: z.string(),
	skip: z.boolean({
		required_error: '게시물 숨김은 필수 값입니다.',
	}),
});

export type { TPostSchema };
export default PostsSchema;
