import crypto from 'crypto';
import nodemailer from 'nodemailer';
import prisma from '@prismaClient';

type ConfirmEmailParams = {
	email: string;
	token: string;
};

type RequestEmailParams = {
	email: string;
};

// 이메일 인증
const confirmEmail = async ({ email, token }: ConfirmEmailParams) => {
	const tokenRecord = await prisma.verificationToken.findFirst({
		where: {
			email: email,
			token: token,
		},
	});

	if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
		throw new Error('Invalid or expired verification token.');
	}

	await prisma.verificationToken.update({
		where: { id: tokenRecord.id },
		data: {
			isVerified: true,
		},
	});

	return {
		message: 'Email verified successfully',
		status: 200,
	};
};

// 이메일 인증 코드 발송
const requestEmail = async ({ email }: RequestEmailParams) => {
	const token = crypto.randomInt(10000000, 99999999).toString();
	const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

	await prisma.verificationToken.create({
		data: {
			email,
			token,
			createdAt: new Date(),
			expiresAt,
			isVerified: false,
		},
	});

	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: process.env.NEXT_PUBLIC_NODEMAILER_USER,
			pass: process.env.NEXT_PUBLIC_NODEMAILER_PASS,
		},
	});

	const mailOptions = {
		from: process.env.NEXT_PUBLIC_NODEMAILER_USER,
		to: email,
		subject: '[이창기 개발 블로그] 이메일 인증 코드',
		html: `
			<p>회원가입을 환영합니다! 이메일 주소를 인증하려면 아래 인증 코드를 입력하세요:</p>
			<p>인증코드: ${token}</p>
		`,
	};

	await transporter.sendMail(mailOptions);
};

export type { RequestEmailParams, ConfirmEmailParams };
export { requestEmail, confirmEmail };
