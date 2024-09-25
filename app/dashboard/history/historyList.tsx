import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Email } from "@prisma/client"

export const HistoryList = ({ email }: { email: Email[] }) => {
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead>Body</TableHead>
                        <TableHead>Sent At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {email.map((email) => (
                        <TableRow key={email.id}>
                            <TableCell>{email.subject}</TableCell>
                            <TableCell>{email.body}</TableCell>
                            <TableCell>{new Date(email.createdAt).toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}