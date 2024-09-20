
import { Card } from "@/components/ui/card";
import FetchNewsletter from "./list";
import RenderList, { RenderListProps } from "./renderList";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default async function NewsletterPage() {
    const { success: fetchedNewsletters, error } = await FetchNewsletter();

    if (error) {
        return (
            <Alert variant="destructive" className="max-w-md mx-auto mt-8">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    No newsletters were found. Please try again later.
                </AlertDescription>
            </Alert>
        );
    }

    const newsletters: RenderListProps['data'] = fetchedNewsletters?.map(newsletter => ({
        id: newsletter.id,
        name: newsletter.name,
        description: null, // Assuming description is not provided by FetchNewsletter
        authorId: 0, // Keeping authorId as it's required by RenderListProps, but setting to 0 as a default
        author: newsletter.author
    })) || [];

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Available Newsletters</h1>
                <p className="text-gray-600">Browse and subscribe to our curated list of newsletters.</p>
            </Card>
            {newsletters.length > 0 ? (
                <RenderList data={newsletters} />
            ) : (
                <Alert className="max-w-md mx-auto">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Information</AlertTitle>
                    <AlertDescription>
                        There are currently no newsletters available.
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
}