"use server"

import { db } from "@/lib/db";



export default async function FetchNewsletter () {
    try {
        const list = await db.newsletter.findMany({
            select : {
                id : true,
                name : true,
                author : {
                    select : {
                        email : true
                    }
                }


            }
        })

        return {success : list};

    } catch (error) {
        return {error : "error occured"}
    }
}