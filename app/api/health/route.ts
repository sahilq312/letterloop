import { NextResponse } from "next/server"

export function GET() {
    try {
        return NextResponse.json("working", {status : 200})
    } catch (error) {
        return new Response("Not Working", {status : 500})
    }
}