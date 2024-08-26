import axios from 'axios';
import { TPosts } from '@/service/posts';

const apiUrl = process.env.NEXT_PUBLIC_API_HOST || '';
const headers = {
	'Content-Type': 'application/json',
};

const updatePostById = async (
	postId: TPosts['post_id'],
	updateData: Partial<Omit<TPosts, 'post_id'>>
): Promise<TPosts> => {
	const url = `${apiUrl}/api/posts/${postId}`;

	try {
		const response = await axios.put(url, updateData, { headers });
		const { data } = response.data;
		return data as TPosts;
	} catch (error) {
		console.error(`Error updating post(post_id: ${postId}):`, error);
		throw new Error(
			'일시적인 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.'
		);
	}
};

export default updatePostById;
