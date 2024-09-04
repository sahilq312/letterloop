import SubscribeForm from "./form";

export default function SubscribePage ({ params }: { params: { id: string } }){
    const newsletterId = parseInt(params.id);
    console.log(newsletterId);
    
    return (
        <>
        <SubscribeForm id={newsletterId}/>
        </>
    )
}