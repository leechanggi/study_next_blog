'use client';

import React from 'react';
import { TImage } from '@/service/image';
import { ImageCard, ImageCardItem } from '@/components';
import { getImages } from '@/lib';

const AdminPosts = () => {
	const [images, setImages] = React.useState<TImage[]>([]);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedPosts = await getImages();
				setImages(fetchedPosts);
			} catch (err) {
				setError('일시적인 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	React.useEffect(() => {
		console.log(images);
	}, [images]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	return (
		<>
			<h2 className='text-xl font-medium mb-2'>이미지 조회</h2>
			<ImageCard>
				<ImageCardItem src='https://syxpcuxevstvmzigssch.supabase.co/storage/v1/object/public/public-images/1733303715731.png' alt='' />
			</ImageCard>
			{/* {images.length > 0 ? (
				<ImageCard>
					<ImageCardItem src='https://syxpcuxevstvmzigssch.supabase.co/storage/v1/object/public/public-images/1733303715731.png' alt='' />
				</ImageCard>
			) : (
				<p>조회된 이미지가 없습니다.</p>
			)} */}
		</>
	);
};

export default AdminPosts;
