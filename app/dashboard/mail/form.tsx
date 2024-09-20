"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid"

const sendMailSchema = z.object({
  newsletterName: z.string(),
  subject: z.string().min(6, { message: "Subject must be at least 6 characters long" }),
  body: z.string().min(10, { message: "Body must be at least 10 characters long" }),
  html: z.string().optional()
})

type SendMailFormValues = z.infer<typeof sendMailSchema>

export const SendMailForm = ({ newsletterName }: { newsletterName: string }) => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isPending, setIsPending] = useState(false)

  const form = useForm<SendMailFormValues>({
    resolver: zodResolver(sendMailSchema),
    defaultValues: {
      newsletterName: newsletterName,
      body: "",
      subject: "",
      html: ""
    }
  })

  const onSubmit = async (values: SendMailFormValues) => {
    setIsPending(true)
    setError(undefined)
    setSuccess(undefined)

    try {
      const response = await fetch("/api/mail", {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(`${data.message} Sent to ${data.sentTo} subscribers.`)
        form.reset()
      } else {
        throw new Error(data.error || "Failed to send email")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Send Email to Subscribers</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="subject"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email subject" {...field}/>
                  </FormControl>
                  <FormDescription>
                    This is the subject line for your email
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <Textarea rows={10} placeholder="Enter email body" {...field}/>
                  </FormControl>
                  <FormDescription>
                    This is the main content of your email
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="html"
              render={({field}) => (
                <FormItem>
                  <FormLabel>HTML (Optional)</FormLabel>
                  <FormControl>
                    <Textarea rows={10} placeholder="Enter HTML template (optional)" {...field}/>
                  </FormControl>
                  <FormDescription>
                    Paste or write the HTML code for your email template (optional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Sending..." : "Send Email"}
            </Button>
            {error && (
              <Alert variant="destructive">
                <XCircleIcon className="h-4 w-4 mr-2" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert variant="default">
                <CheckCircleIcon className="h-4 w-4 mr-2" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SendMailForm