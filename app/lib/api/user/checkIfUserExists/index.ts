import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_HOST || '';
const headers = {
	'Content-Type': 'application/json',
};

const checkIfUserExists = async (email: string): Promise<boolean> => {
	const url = `${apiUrl}/api/user/check`;

	try {
		const response = await axios.post(url, { email }, { headers });
		return response.data.exists;
	} catch (error) {
		console.error('Error checking user existence:', error);
		throw new Error('Failed to check user existence');
	}
};

export default checkIfUserExists;
