import 'server-only'
import { cache } from 'react'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from '@/lib/db';
import { Email } from '@prisma/client';

export const getNewsletter = cache(async (): Promise<{
    id: number;
    name: string;
    emails: Email[];
    description: string | null;
    subscribers: { email: string; }[];
} | null> => {
    try {
        const { getUser } = getKindeServerSession();
        if (!getUser) {
            console.error('Failed to get user session.');
            return null;
        }

        const user = await getUser();
        if (!user?.id) {
            //console.error('User ID is missing.');
            return null;
        }

        const userDetails = await db.user.findUnique({
            where: { kindeId: user.id }
        });

        if (!userDetails) {
            console.error('User details not found.');
            return null;
        }

        const newsletter = await db.newsletter.findUnique({
            where: { authorId: userDetails.id },
            select: {
                id: true,
                name: true,
                description: true,
                emails : true,
                subscribers: {
                    select: {
                        email: true
                    }
                }
            }
        });

        if (!newsletter) {
            console.error('Newsletter not found.');
            return null;
        }

        return newsletter;
    } catch (error) {
        console.error('Error fetching newsletter:', error);
        return null;
    }
});