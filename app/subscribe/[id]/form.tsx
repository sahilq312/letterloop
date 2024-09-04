"use client";

import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import subscribe from "./action"; // Ensure this is a client-side function

const SubscribeNewsletterFormType = z.object({
  newsletterId: z.number(),
  email: z.string().email()
});

export default function SubscribeForm({  id }: { id: number }) {
  
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof SubscribeNewsletterFormType>>({
    resolver: zodResolver(SubscribeNewsletterFormType),
    defaultValues: {
      newsletterId: id, // Use 'newsletterId' here
      email: "",
    },
  });
  console.log(id);
  
  const onSubmit = async (values: z.infer<typeof SubscribeNewsletterFormType>) => {
    startTransition(() => {
      subscribe(values).then((data) => {
        if (data.error) {
          setError(data.error);
        } else if (data.success) {
          setSuccess("Subscribed to the newsletter");
        }
      }).catch((err) => {
        setError("An unexpected error occurred.");
      });
    });
  }

  return (
    <Card className="w-2/5 p-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
          <div className="space-y-6">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="you@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>
        </form>
      </Form>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </Card>
  );
}
