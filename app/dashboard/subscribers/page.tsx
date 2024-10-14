import { Card } from "@/components/ui/card"
import { List } from "./list"
import { getNewsletter } from "@/app/auth/01-detail"

type poepleType = {
  name: String
      email: String
      role: String
      imageUrl:String
      lastSeen: String
      lastSeenDateTime: String
}
type peopleData = {
  data : poepleType[]
}

  export default async function Example() {
    const newsletter = await getNewsletter();
    if(!newsletter) {
      return <Card>No Newsletter Found</Card>
    }
    const newsletterSubscribers = newsletter.subscribers;
    console.log(newsletterSubscribers);
    
    return (
        <div>
          {/* <List people={newsletterSubscribers} /> */}
        </div>
    )
  }
  