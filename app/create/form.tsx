"use client"

import z from  "zod";
import { zodResolver} from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NameNewsletter from "./action";


const SignupNewsletterFormSchema = z.object({
    name : z.string().min(6, {message : "minimum 6 letter allowed"}),
    email : z.string().email()
  })


export const NameNewsletterForm =({email} : {email :string})=> {
    const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const form = useForm<z.infer<typeof SignupNewsletterFormSchema>>({
    resolver: zodResolver(SignupNewsletterFormSchema),
    defaultValues: {
      name : "",
      email : email
    },
  });
  const onSubmit = async(values : z.infer<typeof SignupNewsletterFormSchema>)=> {
    startTransition(()=>{
        NameNewsletter(values).then((data)=> {
            if (data.error) {
                setError(data.error);
              } else if (data.success) {
                setSuccess("OTP verified successfully");
                router.push("/dashboard");
              }
        })
    })
  }
  return (
    <Card className="w-2/5 p-10">
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
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </Form>
    {error && <p className="text-red-500">{error}</p>}
    {success && <p className="text-green-500">{success}</p>}
  </Card>
    )
}