import axios from 'axios';
import { TPosts } from '@/service/posts';

const apiUrl = process.env.NEXT_PUBLIC_API_HOST || '';
const headers = {
	'Content-Type': 'application/json',
};

const deletePostById = async (id: TPosts['id']): Promise<void> => {
	const url = `${apiUrl}/api/posts/${id}`;

	try {
		await axios.delete(url, { headers });
	} catch (error) {
		console.error(`Error deleting post(id: ${id}):`, error);
		throw new Error(
			'일시적인 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.'
		);
	}
};

export default deletePostById;
