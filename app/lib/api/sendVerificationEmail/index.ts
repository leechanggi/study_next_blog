import axios from 'axios';
import { SendVerifyEmailParams } from '@/service/verifyEmail';

const apiUrl = process.env.NEXT_PUBLIC_API_HOST || '';
const headers = {
	'Content-Type': 'application/json',
};

const sendVerificationEmail = async (
	params: SendVerifyEmailParams
): Promise<void> => {
	const url = `${apiUrl}/api/verify-email`;

	try {
		const response = await axios.post(url, params, { headers });
		console.log('Verification email sent:', response.data.message);
	} catch (error) {
		console.error('Error sending verification email:', error);
		throw new Error(
			'일시적인 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.'
		);
	}
};

export default sendVerificationEmail;
