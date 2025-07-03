import { useBorrowedSummeryQuery } from "@/redux/api/baseApi"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { IBorrow } from "@/interfaces/borrow.interface"
import type { IBook } from "@/interfaces/book.interface"

const BorrowSummary = () => {

  const { data: borrowedBooks, isLoading } = useBorrowedSummeryQuery(undefined)

  if (isLoading) return <h3>Loading...</h3>

   console.log(borrowedBooks.data)

  return (
    <div>
      <h1 className="font-bold text-center text-3xl mb-10">Borrow summary</h1>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Total Borrowed Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {borrowedBooks.data?.length > 0 && borrowedBooks.data.map((borrowedBook: any, index: number) => {
              return <TableRow key={index}>
                <TableCell>{borrowedBook?.book?.title}</TableCell>
                <TableCell>{borrowedBook?.book?.isbn}</TableCell>
                <TableCell>{borrowedBook?.totalQuantity}</TableCell>
              </TableRow>
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default BorrowSummary
