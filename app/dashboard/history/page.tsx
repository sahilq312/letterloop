import { getNewsletter } from "@/app/auth/01-detail"
//import { db } from "@/lib/db";
import { HistoryList } from "./historyList";

export default async function HistoryPage() {
    const newsletter = await getNewsletter()
    if(!newsletter){
        return <div>No newsletter was found</div>
    }
    const newsletterId = newsletter.id;
    const emailHistory = newsletter.emails
    console.log(emailHistory);
    
   /*  const emailHistory = await db.newsletter.findFirst({
        where
    }) */
    return (
        <div>
            <HistoryList email={emailHistory} />
        </div>
    )
}