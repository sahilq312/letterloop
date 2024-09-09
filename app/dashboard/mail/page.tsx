import { getNewsletter } from "@/app/auth/01-detail";
import { SendMailForm } from "./form";
import { Card } from "@/components/ui/card";
import { redirect } from "next/navigation";

export default async function Page() {
    const newsletter = await getNewsletter();
    const newslettername= newsletter?.name;
    if(!newsletter){
        redirect("/")
    }
    if(!newslettername){
        return (
            <Card>
                No newsletter found
            </Card>
        )
    }
    return (
        <div>
            <h1>Send mail from {newsletter.name}</h1>
            <SendMailForm newsletterName={newslettername}/>
        </div>
    )
}