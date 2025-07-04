import BorrowBookModal from "@/components/BorrowBookModal";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import UpdateBookModal from "@/components/UpdateBookModal";
import type { IBook, IBookInput } from "@/interfaces/book.interface";
import { useDeleteBookMutation, useGetAllBooksQuery } from "@/redux/api/baseApi"
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { FaEye } from "react-icons/fa";
import { Link } from "react-router";


function Allbooks() {
  const [updatedBook, setUpdatedBook] = useState<IBookInput | null>(null)
  const [updateModalOpen, setUpdateModalOpen] = useState(false)

  const [borrowedBookId, setBorrowedBookId] = useState<string>('')
  const [borrowModalOpen, setBorrowModalOpen] = useState(false)

  const { data, isLoading } = useGetAllBooksQuery(undefined)
  const [deleteBook] = useDeleteBookMutation()

  if (isLoading) return <h3 className="font-bold text-2xl">Loading...</h3>

  const books = data?.data

  // delete book
  const handleDeleteBook = async (bookId: string) => {
    try {
      const res = await deleteBook(bookId).unwrap()
      if (res?.success) {
        toast.success('Book successfully deleted')
      }
    } catch (error: any) {
      console.error('Delete failed', error)
      toast.error(error?.data?.message)
    }
  }

  // Update book icon click
  const handleUpdateClick = (book: IBookInput) => {
    setUpdateModalOpen(true)
    setUpdatedBook(book)
  }

  // Borrow button click to borrow a book
  const handleBorrowClick = (bookId: string) => {
    setBorrowedBookId(bookId)
    setBorrowModalOpen(true)
  }

  return (
    <>
      {/* update book modal  */}
      <UpdateBookModal isOpen={updateModalOpen} onClose={() => { setUpdateModalOpen(false) }} updatedBook={updatedBook} />

      {/* borrow book modal  */}
      <BorrowBookModal isOpen={borrowModalOpen} onClose={() => { setBorrowModalOpen(false) }} borrowedBookId={borrowedBookId} />

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
              {books?.length > 0 && books.map((book: IBook, index: number) => {
                return <TableRow key={index}>
                  <TableCell>{book?.title}</TableCell>
                  <TableCell>{book?.author}</TableCell>
                  <TableCell>{book?.genre}</TableCell>
                  <TableCell>{book?.isbn}</TableCell>
                  <TableCell>{book?.copies}</TableCell>
                  <TableCell>{book?.available && book.copies > 0 ? 'Available' : 'Unavailable'}</TableCell>
                  <TableCell className="flex items-center gap-4">

                    {/* view icon  */}
                    <span className="cursor-pointer text-xl">
                      <Link to={`/book/${book?._id}`}>
                        <FaEye />
                      </Link>
                    </span>
                    
                    {/* edit icon  */}
                    <span className="cursor-pointer text-xl"><FaRegEdit onClick={() => {
                      handleUpdateClick(book)
                    }} /></span>
                    

                    {/* delete book icon  */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <span className="cursor-pointer text-xl text-red-500">
                          <FaRegTrashAlt />
                        </span>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. Do you really want to delete this book?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteBook(book._id)}>
                            Yes, Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <Button onClick={() => {
                      handleBorrowClick(book?._id)
                    }} className="cursor-pointer">Borrow</Button>
                  </TableCell>
                </TableRow>
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}

export default Allbooks
