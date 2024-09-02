import * as z from 'zod';

type TLoginSchema = {
	email: string;
	password: string;
};

const LoginSchema = z.object({
	email: z
		.string()
		.email({ message: '유효한 이메일 주소를 입력하세요.' })
		.min(1, { message: '이메일은 필수 입력 항목입니다.' }),
	password: z
		.string()
		.min(1, { message: '비밀번호는 필수 입력 항목입니다.' })
		.max(24, { message: '최대 24글자 까지 입력가능합니다.' }),
});

export type { TLoginSchema };
export default LoginSchema;
