import { db } from "@/lib/db";
import { transporter } from "@/lib/sendMail";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const subscriber = await db.newsletter.findFirst({
            where: {
                id: 2,
            },
            select: {
                subscribers: true,
                author: {
                    select: {
                        email: true,
                    },
                },
            },
        });

        if (!subscriber) {
            return NextResponse.json({ error: "No subscriber was found" }, { status: 404 });
        }

        const emailList = subscriber.subscribers.flatMap((i) => i.email);
        const emailString = emailList.join(',');

        const mailData = {
            from: subscriber.author.email,
            to: emailString,
            subject: "Test Newsletter",
            text: "This is the test email from newsletter no: 2",
            html: '<h1>Sample header</h1>',
        };

        const info = await transporter.sendMail(mailData);
        return NextResponse.json({ message: "Mail sent", messageId: info.messageId }, { status: 200 });

    } catch (error) {
        console.error("Error sending mail:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
