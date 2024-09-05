import * as z from 'zod';

type TLoginSchema = {
	email: string;
	password: string;
};

const blockedWordsString = process.env.NEXT_PUBLIC_BLOCKED_WORDS || '';

const blockedWords = blockedWordsString
	.replace(/'/g, '')
	.split(',')
	.map(word => word.trim());

const LoginSchema = z.object({
	email: z
		.string()
		.email({ message: '유효한 이메일 주소를 입력하세요.' })
		.min(1, { message: '이메일은 필수 입력 항목입니다.' }),
	password: z
		.string()
		.min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
		.max(24, { message: '비밀번호는 최대 24자까지 가능합니다.' })
		.regex(/[A-Z]/, {
			message: '비밀번호에는 최소 1개의 대문자가 포함되어야 합니다.',
		})
		.regex(/[a-z]/, {
			message: '비밀번호에는 최소 1개의 소문자가 포함되어야 합니다.',
		})
		.regex(/[0-9]/, {
			message: '비밀번호에는 최소 1개의 숫자가 포함되어야 합니다.',
		})
		.regex(/[\@\#\$\!\%\^\&\*]/, {
			message:
				'비밀번호에는 최소 1개의 특수문자(@#$!%^&*)가 포함되어야 합니다.',
		}),
});

export type { TLoginSchema };
export default LoginSchema;
