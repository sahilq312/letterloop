
import { db } from "@/lib/db";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {NextResponse} from "next/server";
import { unstable_noStore as noStore } from "next/cache";


export async function GET() {
    noStore();
    const { getUser } = getKindeServerSession();
    const user = await getUser();
  
    if (!user || user === null || !user.id) {
      throw new Error("Something went wrong...");
    }
  
    let dbUser = await db.user.findUnique({
      where: {
        email: user.email ?? "",
      },
    });
  
    if (!dbUser) {
      dbUser = await db.user.create({
        data: {
          firstName: user.given_name ?? "",
          lastName: user.family_name ?? "",
          email: user.email ?? "",
          kindeId : user.id
        },
      });
    }
  
    return NextResponse.redirect("http://localhost:3000/dashboard");
  }