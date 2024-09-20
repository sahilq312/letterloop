"use client"

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import updateNewsletter from "./update";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircleIcon, XCircleIcon, ShareIcon } from "@heroicons/react/24/solid";

const NewsletterFormSchema = z.object({
    id: z.number(),
    name: z.string().min(6, { message: "Name must be at least 6 characters long" }),
    description: z.string().min(10, { message: "Description must be at least 10 characters long" })
});

export const NameNewsletterForm = ({ id }: { id: number }) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [shareUrl, setShareUrl] = useState<string | null>(null);
    const form = useForm<z.infer<typeof NewsletterFormSchema>>({
        resolver: zodResolver(NewsletterFormSchema),
        defaultValues: {
            id: id,
            name: "",
            description: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof NewsletterFormSchema>) => {
        setError(undefined);
        setSuccess(undefined);
        startTransition(() => {
            updateNewsletter(values).then((data) => {
                if (data.success) {
                    setSuccess(data.success);
                    setShareUrl(`https://yourwebsite.com/subscribe/${id}`); // Replace with your actual subscription URL
                    form.reset();
                } else if (data.error) {
                    setError(data.error);
                }
            });
        });
    };

    const handleShare = async () => {
        if (shareUrl) {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'Subscribe to my newsletter',
                        text: 'Check out my newsletter!',
                        url: shareUrl,
                    });
                } catch (error) {
                    console.error('Error sharing:', error);
                }
            } else {
                // Fallback for browsers that don't support the Web Share API
                await navigator.clipboard.writeText(shareUrl);
                alert('Share link copied to clipboard!');
            }
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Create Newsletter</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Newsletter Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Enter newsletter name"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="description"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Enter newsletter description"
                                            rows={4}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {error && (
                            <Alert variant="destructive">
                                <XCircleIcon className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        {success && (
                            <Alert>
                                <CheckCircleIcon className="h-4 w-4" />
                                <AlertDescription>{success}</AlertDescription>
                            </Alert>
                        )}
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? "Creating..." : "Create Newsletter"}
                        </Button>
                    </form>
                </Form>

                {shareUrl && (
                    <div className="mt-6">
                        <Button 
                            onClick={handleShare} 
                            className="w-full flex items-center justify-center"
                        >
                            <ShareIcon className="h-5 w-5 mr-2" />
                            Share Newsletter
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
