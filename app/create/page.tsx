import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NameNewsletterForm } from "./form";
import { Card } from "@/components/ui/card";

export default async function Page () {
    const {getUser} = getKindeServerSession();
    const user = await getUser(); 
    if(!user ){
        redirect("/login")
    }
    if(!user.email){
        redirect("/login")
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
        <NameNewsletterForm email={user.email}/>
        </div>
    )
}