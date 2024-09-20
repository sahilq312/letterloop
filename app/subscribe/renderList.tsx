// File: renderList.tsx or renderList.js
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export type RenderListProps = {
    data: {
        id: number;
        name: string;
        description: string | null;
        authorId: number;
        author: {
            email: string;
        };
    }[];
};

export default function RenderList({ data }: RenderListProps) {
    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
                <Card className="flex flex-col p-6 gap-4 shadow-lg hover:shadow-xl transition-shadow duration-300" key={item.id}>
                    <h1 className="font-bold text-2xl text-center -800 mb-2">{item.name}</h1>
                    <p className="text-sm text-gray-600 text-center">By: {item.author.email}</p>
                    {item.description && <p className="text-gray-700 text-center mt-2">{item.description}</p>}
                    <div className="mt-auto pt-4">
                        <Link href={`/subscribe/${item.id}`} className="w-full">
                            <Button className="w-full">Subscribe</Button>
                        </Link>
                    </div>
                </Card>
            ))}
        </ul>
    );
}
