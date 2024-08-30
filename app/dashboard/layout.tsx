import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";

export default async function DashboardLayout ({children} : {children : React.ReactNode}) {
    /* const { isAuthenticated, getUser } = getKindeServerSession();
    const user = await getUser();
    if(!user){
        redirect("/login")
    } */
    return (
        <div>
            {children}
        </div>
    )
}