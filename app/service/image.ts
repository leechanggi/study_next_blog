import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@prismaClient';
import supabase from '@supabaseClient';

type TImage = {
	id: string;
	bucket: string;
	path: string;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
	publicUrl?: string;
};

type TCreateImageProps = {
	bucket: string;
	path: string;
	file: File;
	userId: string;
};

const createImage = async ({ bucket = 'public-images', path, file, userId }: TCreateImageProps): Promise<TImage> => {
	const { data: _uploadData, error: uploadError } = await supabase.storage.from(bucket).upload(path, file);

	if (uploadError) {
		throw new Error(`Failed to upload file to Supabase: ${uploadError.message}`);
	}

	const publicUrl = supabase.storage.from(bucket).getPublicUrl(path).data?.publicUrl;
	if (!publicUrl) {
		throw new Error('Failed to retrieve public URL for the uploaded file.');
	}

	const newImage = await prisma.image.create({
		data: {
			bucket,
			path,
			userId,
			createdAt: new Date(),
		},
	});

	return {
		...newImage,
		publicUrl,
	};
};

const getImages = async (bucket: string = 'public-images'): Promise<TImage[]> => {
	const { data: files, error } = await supabase.storage.from(bucket).list();

	if (error) {
		throw new Error(`Failed to fetch images from bucket: ${error.message}`);
	}

	if (!files) return [];

	const images = await prisma.image.findMany({
		where: {
			bucket,
			path: {
				in: files.map(file => file.name),
			},
		},
	});

	return images.map(image => ({
		...image,
		publicUrl: supabase.storage.from(bucket).getPublicUrl(image.path).data?.publicUrl || undefined,
	}));
};

const getImageById = async (id: TImage['id']): Promise<TImage | null> => {
	const image = await prisma.image.findUnique({
		where: { id },
	});

	if (!image) return null;

	const publicUrl = supabase.storage.from(image.bucket).getPublicUrl(image.path).data?.publicUrl;

	return { ...image, publicUrl: publicUrl || undefined };
};

const deleteImageById = async (id: TImage['id']): Promise<TImage | null> => {
	const image = await prisma.image.findUnique({
		where: { id },
	});

	if (!image) {
		throw new Error('Image not found');
	}

	const { error } = await supabase.storage.from(image.bucket).remove([image.path]);

	if (error) {
		throw new Error(`Failed to delete image from Supabase: ${error.message}`);
	}

	const deletedImage = await prisma.image.delete({
		where: { id },
	});

	return deletedImage;
};

export type { TImage };
export { createImage, getImages, getImageById, deleteImageById };
