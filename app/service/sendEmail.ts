import nodemailer from 'nodemailer';

type TEmail = {
	user_name: string;
	user_email: string;
	message: string;
};

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: process.env.NEXT_PUBLIC_NODEMAILER_USER || '',
		pass: process.env.NEXT_PUBLIC_NODEMAILER_PASS || '',
	},
});

const postSendEmail = ({ user_name, user_email, message }: TEmail) => {
	const mailOptions = {
		to: process.env.NEXT_PUBLIC_NODEMAILER_USER || '',
		from: user_email,
		subject: `개발 블로그 이메일 FROM '${user_name}'`,
		html: `
      <p>user_name: ${user_name}</p>
      <p>user_email: ${user_email}</p>
      <p>message: ${message}</p>
    `,
	};
	return transporter.sendMail(mailOptions);
};

export type { TEmail };
export { postSendEmail };
