import { Avatar } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
const people = [
    {
     
      email: 'leslie.alexander@example.com',
      date : ''
    },
    {
      email: 'michael.foster@example.com',
      date : '',
    },
    {
      email: 'michael.foster@example.com',
      date : '',
    },
    {
      email: 'michael.foster@example.com',
      date : '',
    },
    {
      email: 'michael.foster@example.com',
      date : '',
    },
]
export const List = () => {
    return (
        <div className="flex flex-col  items-center justify-center p-3 mt-6 gap-6">
          <div className="flex flex-col text-center">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      Subscribers
    </h3>
           <h4 className="scroll-m-20 text-slate-600 text-xl font-semibold tracking-tight ">
      People who subscribered this newsletter
    </h4>
    </div>
        <Card className="w-2/3 p-3">
      <ul role="list" className="divide-y divide-gray-100">
        {people.map((person) => (
          <li key={person.email} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <Avatar  className="h-12 w-12 flex-none rounded-full bg-gray-50" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{person.email}</p>
                {/* <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p> */}
              </div>
            </div>
          </li>
        ))}
      </ul>
      </Card>
      </div>
    )
}