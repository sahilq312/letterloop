import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NameNewsletterForm } from "./form";
import { Card } from "@/components/ui/card";

export default async function Page () {
    const {getUser} = getKindeServerSession();
    //get user session
   
    
    const user = await getUser();
      /* console.log(
        "user",
        user
    ); */
    // if any error with session redirect to login page
    if(!user || !user.email ){
        redirect("/login")
    }
   /*  if(!user.email){
        redirect("/login")
    } */
    console.log(user.email);
    

    return (
        <div className="flex items-center justify-center min-h-screen">
        <NameNewsletterForm email={user.email}/>
        </div>
    )
}