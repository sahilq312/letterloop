"use client";

import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import subscribe from "./action";
import { AlertCircle, CheckCircle } from "lucide-react";

const SubscribeNewsletterFormType = z.object({
  newsletterId: z.number(),
  email: z.string().email()
});

export default function SubscribeForm({ id }: { id: number }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof SubscribeNewsletterFormType>>({
    resolver: zodResolver(SubscribeNewsletterFormType),
    defaultValues: {
      newsletterId: id,
      email: "",
    },
  });
  
  const onSubmit = async (values: z.infer<typeof SubscribeNewsletterFormType>) => {
    setIsSubmitting(true);
    try {
      const data = await subscribe(values);
      if (data.error) {
        setError(data.error);
      } else if (data.success) {
        setSuccess("You've successfully subscribed to the newsletter.");
        form.reset();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="max-w-md w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Subscribe to Our Newsletter</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Email Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    placeholder="you@example.com"
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-300" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe Now"}
          </Button>
        </form>
      </Form>
      {error && (
        <div className="flex items-center mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          <AlertCircle className="h-5 w-5 mr-2" />
          <p>{error}</p>
        </div>
      )}
      {success && (
        <div className="flex items-center mt-4 p-3 bg-green-100 text-green-700 rounded-md">
          <CheckCircle className="h-5 w-5 mr-2" />
          <p>{success}</p>
        </div>
      )}
    </Card>
  );
}
