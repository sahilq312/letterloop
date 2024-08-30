import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NameNewsletterForm } from "./form";

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
        <>
        <NameNewsletterForm email={user.email}/>
        </>
    )
}