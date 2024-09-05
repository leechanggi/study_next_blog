import axios from 'axios';
import { RequestEmailParams } from '@/service/verificationToken';

const apiUrl = process.env.NEXT_PUBLIC_API_HOST || '';
const headers = {
	'Content-Type': 'application/json',
};

const requestEmail = async (params: RequestEmailParams): Promise<void> => {
	const url = `${apiUrl}/api/email/request`;

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

export default requestEmail;
