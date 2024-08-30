"use server"

import { db } from "@/lib/db"
import { error } from "console"

export default async function NameNewsletter({email, name} : { email : string, name : string}) {
    try {
        const user = await db.user.findUnique({
            where : {
                email : email
            },
            select : {
                id : true
            }
        })
        if(!user){
            return {error : " no user was found"}
        }
        const newsletter = await db.newsletter.create({
            data : {
                name : name,
                authorId : user.id
            }
        })
        return {success : "Newsletter is created successfully"}
       } catch (error) {
        return {error : "something went wrong"}
    }
}