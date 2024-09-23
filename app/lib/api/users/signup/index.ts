import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_HOST || '';
const headers = {
	'Content-Type': 'application/json',
};

const signup = async (email: string, password: string) => {
	const url = `${apiUrl}/api/user/signup`;

	try {
		const response = await axios.post(url, { email, password }, { headers });
		return response.data;
	} catch (error) {
		console.error('Error during signup:', error);
		throw new Error('Signup failed');
	}
};

export default signup;
