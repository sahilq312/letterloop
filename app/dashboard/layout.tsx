import { DashboardNavbar } from "@/components/ui/dashboard/navbar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";
import { getNewsletter } from "../auth/01-detail";

export default async function DashboardLayout ({children} : {children : React.ReactNode}) {
    const newsletter = await getNewsletter();
    if(!newsletter){
        redirect("/create")
    }
    return (
        <DashboardNavbar>
            {children}
        </DashboardNavbar>
    )
}