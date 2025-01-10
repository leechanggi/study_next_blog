import axios from 'axios';
import { TImage } from '@/service/image';

const apiUrl = process.env.NEXT_PUBLIC_API_HOST || '';
const headers = {
  'Content-Type': 'application/json',
};

const getImageById = async (): Promise<TImage[]> => {
  const url = `${apiUrl}/api/images`;

  try {
    const response = await axios.get(url, { headers });
    const { data } = response.data;
    return data as TImage[];
  } catch (error) {
    console.error('Error fetching images:', error);
    throw new Error('일시적인 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.');
  }
};

export default getImageById;
