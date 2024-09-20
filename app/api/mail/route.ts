import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { transporter } from "@/lib/sendMail";

const serverSendMailSchema = z.object({
  newsletterName: z.string().nonempty("Newsletter name is required"),
  subject: z.string().min(6, { message: "Subject must be at least 6 characters long" }),
  body: z.string().optional(),
  html: z.string().optional(),
  to: z.string().optional(),
}).refine(data => data.body || data.html, {
  message: "Either body or html must be provided",
  path: ["body"],
});

export async function POST(req: NextRequest) {
  try {
    const { getUser, isAuthenticated } = await getKindeServerSession();

    if (!await isAuthenticated()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getUser();
    if (!user || !user.id) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    const requestBody = await req.json();
    const validatedData = serverSendMailSchema.safeParse(requestBody);

    if (!validatedData.success) {
      return NextResponse.json({ error: validatedData.error.format() }, { status: 400 });
    }

    const newsletter = await db.newsletter.findUnique({
      where: {
        name: validatedData.data.newsletterName,
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

    if (!newsletter) {
      return NextResponse.json({ error: "Newsletter not found" }, { status: 404 });
    }

    const emailList = newsletter.subscribers.map((subscriber) => subscriber.email);
    const emailString = emailList.join(',');

    const mailData = {
      from: newsletter.author.email, // Assuming the newsletter author sends the email
      to: emailString, 
      subject: validatedData.data.subject,
      text: validatedData.data.body || undefined, // Either plain text body
      html: validatedData.data.html || undefined, // Or HTML content
    };

    const info = await transporter.sendMail(mailData);
    return NextResponse.json({ message: "Mail sent", messageId: info.messageId }, { status: 200 });

  } catch (error) {
    console.error("Error sending mail:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
/* const serverSendMailSchema = z.object({
  newsletterName: z.string().nonempty("Newsletter name is required"),
  subject: z.string().min(6, { message: "Subject must be at least 6 characters long" }),
  body: z.string().optional(),
  html: z.string().optional(),
  to: z.string().optional()
}).refine(data => data.body || data.html, {
  message: "Either body or html must be provided",
  path: ["body"]
});

export async function POST(req: NextRequest) {
  try {
    const { getUser, isAuthenticated } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getUser();
    if (!user || !user.id) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const requestBody = await req.json();
    const validatedData = serverSendMailSchema.safeParse(requestBody);

    if (!validatedData.success) {
      return NextResponse.json({ error: validatedData.error.format() }, { status: 400 });
    }

    const result = await sendMail(validatedData.data, user.id);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ message: "Email sent successfully", sentTo: result.sentTo }, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/mail:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}

type SendMailResult = 
  | { success: true; sentTo: number }
  | { success: false; error: string };

async function sendMail(values: z.infer<typeof serverSendMailSchema>, userId: string): Promise<SendMailResult> {
  try {
    const newsletter = await db.newsletter.findFirst({
      where: { 
        name: values.newsletterName,
        author: { kindeId: userId }
      },
      include: {
        author: { select: { email: true } },
        subscribers: { select: { email: true } },
        emails: { select: { id: true, subject: true, body: true, html: true } }
      }
    });

    if (!newsletter) {
      return { success: false, error: "Newsletter not found or you don't have permission to send emails for this newsletter" };
    }

    if (!newsletter.emails || newsletter.emails.length === 0) {
      return { success: false, error: "No email data found for this newsletter" };
    }

    const latestEmail = newsletter.emails[newsletter.emails.length - 1];

    let recipients: string[] = [];

    if (values.to) {
      // If 'to' is provided, use it as the recipient list
      recipients = values.to.split(',').map(email => email.trim()).filter(email => email !== '');
    } else {
      // Otherwise, use the newsletter subscribers
      recipients = newsletter.subscribers.map(sub => sub.email);
    }

    if (recipients.length === 0) {
      return { success: false, error: "No valid recipients found" };
    }

    for (const recipient of recipients) {
      const mailOptions = {
        from: newsletter.author.email,
        to: recipient,
        subject: values.subject || latestEmail.subject,
        text: values.body || latestEmail.body,
        html: values.html || latestEmail.html
      };

      await transporter.sendMail(mailOptions);
    }

    // Create a new Email record
    await db.email.create({
      data: {
        subject: values.subject || latestEmail.subject,
        body: values.body || latestEmail.body,
        html: values.html || latestEmail.html,
        newsletter: { connect: { id: newsletter.id } }
      }
    });

    return { success: true, sentTo: recipients.length };
  } catch (error) {
    console.error("Error sending mail:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to send email" };
  }
} */