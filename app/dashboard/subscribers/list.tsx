import { Avatar } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"

const people = [
    {
      email: 'leslie.alexander@example.com',
      date: '2023-06-01'
    },
    {
      email: 'michael.foster@example.com',
      date: '2023-06-02',
    },
    {
      email: 'dries.vincent@example.com',
      date: '2023-06-03',
    },
    {
      email: 'lindsay.walton@example.com',
      date: '2023-06-04',
    },
    {
      email: 'courtney.henry@example.com',
      date: '2023-06-05',
    },
]

export const List = () => {
    return (
        <div className="flex flex-col items-center justify-center p-3 mt-6 gap-6">
          <div className="flex flex-col text-center">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
              Subscribers
            </h3>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-gray-600 dark:text-gray-300">
              People who subscribed to this newsletter
            </h4>
          </div>
          <Card className="max-w-3xl w-full p-3">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
              {people.map((person) => (
                <li key={person.email} className="flex justify-between gap-x-6 py-5">
                  <div className="flex min-w-0 gap-x-4">
                    <Avatar className="h-12 w-12 flex-none rounded-full bg-gray-50 dark:bg-gray-700" />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">{person.email}</p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-gray-400">Subscribed on: {person.date}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
    )
}