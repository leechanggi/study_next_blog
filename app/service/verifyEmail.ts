import crypto from 'crypto';
import nodemailer from 'nodemailer';
import prisma from '@prismaClient';

type SendVerifyEmailParams = {
	email: string;
};

type VerifyEmailParams = {
	token: string;
	email: string;
};

const sendVerificationEmail = async ({ email }: SendVerifyEmailParams) => {
	const token = crypto.randomBytes(32).toString('hex');
	const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

	await prisma.verificationToken.create({
		data: {
			email,
			token,
			createdAt: new Date(),
			expiresAt,
		},
	});

	const verificationLink = `${process.env.NEXT_PUBLIC_API_HOST}/api/verify-email?token=${token}&email=${email}`;

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
		subject: '이메일 인증',
		html: `
			<p>회원가입을 환영합니다! 이메일 주소를 인증하려면 아래 링크를 클릭해주세요</p>
			<a href="${verificationLink}">이메일 인증 하기</a>
		`,
	};

	await transporter.sendMail(mailOptions);
};

const verifyEmail = async ({ token, email }: VerifyEmailParams) => {
	const tokenRecord = await prisma.verificationToken.findFirst({
		where: {
			email: email,
			token: token,
		},
	});

	if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
		throw new Error('Invalid or expired token');
	}

	await prisma.verificationToken.update({
		where: { id: tokenRecord.id },
		data: {
			isVerified: true,
		},
	});
};

export type { SendVerifyEmailParams, VerifyEmailParams };
export { sendVerificationEmail, verifyEmail };
