import axios from 'axios';
import { TUser } from '@/service/user';

const apiUrl = process.env.NEXT_PUBLIC_API_HOST || '';
const headers = {
	'Content-Type': 'application/json',
};

const getUsers = async (): Promise<TUser[]> => {
	const url = `${apiUrl}/api/users`;

	try {
		const response = await axios.get(url, { headers });
		const { data } = response.data;
		return data as TUser[];
	} catch (error) {
		console.error('Error fetching posts:', error);
		throw new Error(
			'일시적인 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.'
		);
	}
};

export default getUsers;
