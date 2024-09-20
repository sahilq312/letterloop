import { getNewsletter } from "@/app/auth/01-detail";
import { SendMailForm } from "./form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { redirect } from "next/navigation";

export default async function Page() {
    const newsletter = await getNewsletter();
    
    if (!newsletter) {
        redirect("/");
    }
    
    if (!newsletter.name) {
        return (
            <Card className="max-w-2xl mx-auto mt-8">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold text-gray-800">Newsletter Not Found</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-gray-600">No newsletter information is available at this time.</p>
                </CardContent>
            </Card>
        );
    }
    
    return (
        <div className="max-w-4xl mx-auto mt-8 px-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800">
                        Send Email for {newsletter.name}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <SendMailForm newsletterName={newsletter.name} />
                </CardContent>
            </Card>
        </div>
    );
}