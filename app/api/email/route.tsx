import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { from, to, subject, text } = data;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: "465",
        secure: true,
        auth: {
            user: "navodchathushka@gmail.com",
            pass: "zkpi vnxg dmmw lyoy",
        },
    });
    try {
        await transporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            text: text,
        });

        return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error sending message', error }, { status: 500 });
    }
}