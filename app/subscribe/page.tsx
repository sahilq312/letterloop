
import { Card } from "@/components/ui/card";
import FetchNewsletter from "./list";
import RenderList from "./renderList";

export default async function Page () {
const newsletterList = await FetchNewsletter();
    if(newsletterList.error){
        return (
            <>No newsletter was found</>
        )
    }
    if(newsletterList.success){
    return (
        <div className="w-full min-h-screen flex flex-col items-center p-6 gap-4">
            <h1 className="font-semibold text-2xl">Newsletters</h1>
            <RenderList data={newsletterList.success}/>
        </div>
    )}
}