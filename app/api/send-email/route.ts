import { NextRequest, NextResponse } from 'next/server';
import { postSendEmail, TEmail } from '@service/sendEmail';

const POST = async (req: NextRequest) => {
	try {
		const { user_name, user_email, message }: TEmail = await req.json();
		await postSendEmail({ user_name, user_email, message });
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Error sending email:', error);
		return NextResponse.json({ success: false, error }, { status: 500 });
	}
};

export { POST };
