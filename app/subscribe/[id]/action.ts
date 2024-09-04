"use server"

import { db } from "@/lib/db";

export default async function subscribe({ newsletterId, email }: { newsletterId: number, email: string }) {
    try {
        // Check if the newsletter exists
        const newsletter = await db.newsletter.findUnique({
            where: {
                id: newsletterId,
            },
            select: {
                subscribers: {
                    where: {
                        email: email,
                    },
                },
            },
        });

        if (!newsletter) {
            return { error: "Newsletter not found." };
        }

        // Check if the email is already subscribed
        if (newsletter.subscribers.length > 0) {
            return { error: "Email is already subscribed to this newsletter." };
        }

        // Add the subscriber to the newsletter
        await db.subscriber.create({
            data: {
                email: email,
                newsletter: {
                    connect: {
                        id: newsletterId,
                    },
                },
            },
        });

        return { success: "Email subscribed successfully." };
    } catch (error: any) {
        console.error("Error subscribing to newsletter:", error);
        return { error: "Something went wrong." };
    }
}
