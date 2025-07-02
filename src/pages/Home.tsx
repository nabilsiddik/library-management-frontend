import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useGetAllBooksQuery } from "@/redux/api/baseApi"
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";


function Home() {
  const { data, isLoading } = useGetAllBooksQuery(undefined)

  if (isLoading) return <h3 className="font-bold text-2xl">Loading...</h3>

  const books = data?.data

  console.log(books)

  return (
    <>

      <div className="w-full">
        <div className="flex items-center py-4">
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead>Copies</TableHead>
                <TableHead>Availablity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books?.length > 0 && books.map((book: any, index: number) => {
                return <TableRow key={index}>
                  <TableCell>{book?.title}</TableCell>
                  <TableCell>{book?.author}</TableCell>
                  <TableCell>{book?.genre}</TableCell>
                  <TableCell>{book?.isbn}</TableCell>
                  <TableCell>{book?.copies}</TableCell>
                  <TableCell>{book?.available ? 'Available' : 'Unavailable'}</TableCell>
                  <TableCell className="flex items-center gap-3">
                    <span className="cursor-pointer text-xl"><FaRegEdit /></span>
                    <span className="cursor-pointer text-xl"><FaRegTrashAlt /></span>
                    <Button className="cursor-pointer">Borrow</Button>
                  </TableCell>
                </TableRow>
              })}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* {books.length > 0 && books.map((book) => {
        return <h1>{book.isbn}</h1>
      })} */}
    </>
  )
}

export default Home
