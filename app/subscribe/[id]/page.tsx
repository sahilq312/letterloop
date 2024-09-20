import SubscribeForm from "./form";

export default function SubscribePage ({ params }: { params: { id: string } }){
    const newsletterId = parseInt(params.id);
    //console.log(newsletterId);
    
    return (
        <div className="flex justify-center items-center h-screen">
        <SubscribeForm id={newsletterId}/>
        </div>
    )
}