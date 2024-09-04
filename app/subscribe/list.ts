"use server"

import { db } from "@/lib/db";



export default async function FetchNewsletter () {
    try {
        const list = await db.newsletter.findMany()
        return {success : list};
    } catch (error) {
        return {error : "error occured"}
    }
}