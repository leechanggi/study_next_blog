import { NextRequest, NextResponse } from 'next/server';
import { postSendEmail, TEmail } from '@/service/sendEmail';

const POST = async (req: NextRequest) => {
	try {
		const data: TEmail = await req.json();
		await postSendEmail(data);
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Error sending email:', error);
		return NextResponse.json({ success: false, error }, { status: 500 });
	}
};

export { POST };
