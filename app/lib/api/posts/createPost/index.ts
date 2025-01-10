import axios from 'axios';
import { TPosts, TControllablePosts } from '@/service/post';

const apiUrl = process.env.NEXT_PUBLIC_API_HOST || '';
const headers = {
  'Content-Type': 'application/json',
};

const createPost = async (postData: TControllablePosts): Promise<TPosts> => {
  const url = `${apiUrl}/api/posts`;

  try {
    const response = await axios.post(url, postData, { headers });
    const { data } = response.data;
    return data as TPosts;
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('일시적인 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.');
  }
};

export default createPost;
