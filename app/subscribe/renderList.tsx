// File: renderList.tsx or renderList.js
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Newsletter } from "@prisma/client";
import Link from "next/link";

type RenderListProps = {
    data: Newsletter[];
};

export default function RenderList({ data }: RenderListProps) {
    return (
        <ul className="grid grid-cols-3 gap-4">
            {data.map((item) => (
                <Card className="flex flex-col p-2 gap-6" key={item.id}><h1 className="font-semibold text-xl text-center">{item.name}</h1>
                <Link href={`/subscribe/${item.id}`}><Button >Subscribe</Button></Link></Card> // Assuming `Newsletter` has `id` and `title` fields
            ))}
        </ul>
    );
}
