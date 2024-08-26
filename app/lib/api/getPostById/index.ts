import axios from 'axios';
import { TPosts, TPostsWithNav } from '@/service/posts';

const apiUrl = process.env.NEXT_PUBLIC_API_HOST || '';
const headers = {
	'Content-Type': 'application/json',
};

const getPostById = async (
	postId: TPosts['post_id'],
	withNav: boolean = true,
	withSkip: boolean = false
): Promise<TPosts | TPostsWithNav> => {
	const withNavString = withNav ? 'true' : 'false';
	const withSkipString = withSkip ? 'true' : 'false';
	const url = `${apiUrl}/api/posts/${postId}?withNav=${withNavString}&withSkip=${withSkipString}`;

	try {
		const response = await axios.get<{ data: TPosts | TPostsWithNav }>(url, {
			headers,
		});
		const { data } = response.data;
		return data;
	} catch (error) {
		console.error('Error fetching post by id:', error);
		throw new Error(
			'일시적인 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.'
		);
	}
};

export default getPostById;
