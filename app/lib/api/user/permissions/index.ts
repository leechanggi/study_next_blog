import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_HOST || '';
const headers = {
	'Content-Type': 'application/json',
};

const getUserPermissions = async (
	email: string
): Promise<{ role: string; permissions: any }> => {
	const url = `${apiUrl}/api/user/permissions?email=${encodeURIComponent(
		email
	)}`;

	try {
		const response = await axios.get(url, { headers });
		return response.data;
	} catch (error) {
		console.error('Error retrieving user permissions:', error);
		throw new Error('Failed to retrieve user permissions');
	}
};

export default getUserPermissions;
