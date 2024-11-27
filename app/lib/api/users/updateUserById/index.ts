import axios from 'axios';
import { TUser, TControllableUser } from '@/service/user';

const apiUrl = process.env.NEXT_PUBLIC_API_HOST || '';
const headers = {
	'Content-Type': 'application/json',
};

const updatePostById = async (id: TUser['id'], updateData: Partial<Omit<TControllableUser, 'id'>>): Promise<TControllableUser> => {
	const url = `${apiUrl}/api/users/${id}`;

	try {
		const response = await axios.put(url, updateData, { headers });
		const { data } = response.data;
		return data as TControllableUser;
	} catch (error) {
		console.error(`Error updating post(id: ${id}):`, error);
		throw new Error('일시적인 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.');
	}
};

export default updatePostById;
