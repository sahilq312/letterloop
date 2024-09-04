import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
export async function POST(req : NextRequest) {
  const { getUser, isAuthenticated } = getKindeServerSession();
  console.log(req);
  
  if (!(await isAuthenticated())) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await getUser();
  const data = { message: "Hello User", id: user?.email };

  return NextResponse.json({ data });
} 