import { getNewsletter } from '../auth/01-detail'
import {NameNewsletterForm} from './newsletterForm'


export default async function Page() {
  const newsletter = await getNewsletter()
  const newsletterId = newsletter?.id
  const newsletterName = newsletter?.name;
  const newsletterDescription = newsletter?.description;
  const newsletterSubscribers = newsletter?.subscribers.length;
  if (!newsletter) {
    return <div>No newsletter found</div>
  }

  if (!newsletterId) {
    return <div>No newsletter id found</div>
  }
    return (
       <div>
         <NameNewsletterForm
            id={newsletterId}
           name={newsletterName } 
           description={newsletterDescription ?? undefined} 
           subscribers={newsletterSubscribers ?? undefined} 
         />
       </div>
    )
}