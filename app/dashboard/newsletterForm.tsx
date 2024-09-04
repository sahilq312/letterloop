"use client"

import z from "zod";
import { useState , useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import updateNewsletter from "./update";

const NewsletterFormSchema = z.object({
    id : z.number(),
    name : z.string().min(6, {message : "minimum 6 letter allowed"}),
    description : z.string().email()
})


export const NameNewsletterForm =({id} : {id : number})=> {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const form = useForm<z.infer<typeof NewsletterFormSchema>>({
        resolver: zodResolver(NewsletterFormSchema),
        defaultValues: {
            id : id,
            name : "",
            description : "",
        },
    });

    const onSubmit = async (values : z.infer<typeof NewsletterFormSchema>) => {
        startTransition(()=> {
            updateNewsletter(values).then((data)=> {
                if (data.success){
                    setSuccess(data.success)
                }else if (data.error){
                    setError(data.error)
                }
            })
        })
    }

    return (
        <div>
            <Form{...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
                    <div className="space-y-6">
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name your newsletter </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Acme co"
                                            type="text"
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
                                    <FormLabel>description </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="description"
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? "Updating..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )}
