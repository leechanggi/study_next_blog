import { NextRequest, NextResponse } from 'next/server';
import { notFound } from 'next/navigation';

import { getImages, createImage } from '@/service/image';

const GET = async (_request: NextRequest) => {
  const data = await getImages();

  if (!data) {
    return notFound();
  }

  return NextResponse.json({ data });
};

const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { bucket, path, file, userId } = body;

    if (!bucket || !path || !userId || !file) {
      return NextResponse.json(
        {
          message: '이미지의 bucket, path, file, userId 값이 올바르지 않습니다.',
        },
        { status: 400 }
      );
    }

    const data = await createImage({
      bucket,
      path,
      file,
      userId,
    });

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create images', error }, { status: 500 });
  }
};

export { GET, POST };
