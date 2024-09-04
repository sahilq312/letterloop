import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const SendMailSchema = z.object({
  to : z.array(z.string().email()),
  from : z.string().email(),
  subject : z.string(),
  body : z.string(),
  html : z.string()
})


export async function POST(req: NextRequest) {
  try {
    const reqbody = await req.json();
    const { body, from, html , subject, to} = SendMailSchema.parse(reqbody);

    const data = { message: `Hello ` };

    return NextResponse.json(data);
  } catch (error) {
    return new Response("Invalid credentials", { status: 400 });
  }
}