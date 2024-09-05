import axios from 'axios';
import { TPosts } from '@/service/post';

const apiUrl = process.env.NEXT_PUBLIC_API_HOST || '';
const headers = {
	'Content-Type': 'application/json',
};

const getPosts = async (withSkip: boolean = false): Promise<TPosts[]> => {
	const url = `${apiUrl}/api/posts?withSkip=${withSkip}`;

	try {
		const response = await axios.get(url, { headers });
		const { data } = response.data;
		return data as TPosts[];
	} catch (error) {
		console.error('Error fetching posts:', error);
		throw new Error(
			'일시적인 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.'
		);
	}
};

export default getPosts;
