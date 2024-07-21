import path from 'path';
import { promises as fs } from 'fs';

type TPosts = {
	id: string;
	title: string;
	content: string;
	createdAt: string;
	tags: string[];
	imgSrc?: string;
};

const getPosts = async (): Promise<TPosts[]> => {
	const filePath = path.join(process.cwd(), 'data', 'posts.json');
	const jsonData = await fs.readFile(filePath, 'utf-8');
	return JSON.parse(jsonData);
};

const getPostById = async (id: string) => {
	const posts = await getPosts();
	return posts.find(post => post.id === id);
};

export type { TPosts };
export { getPosts, getPostById };
