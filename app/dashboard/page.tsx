import {NameNewsletterForm} from './newsletterForm'
export default function Page({params} : {params : {id : number}}) {
    const newsletterId = params.id
    return (
       <div>
         <NameNewsletterForm id={newsletterId}/>
       </div>
    )
}