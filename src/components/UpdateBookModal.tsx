import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "./ui/form"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useEffect } from "react"
import { useUpdateTaskMutation } from "@/redux/api/baseApi"
import type { UpdateBookModalProps } from "@/interfaces/UpdateBookModalProps.interface"
import type { IBookInput } from "@/interfaces/book.interface"
import { toast } from 'react-toastify';

export function UpdateBookModal({ updatedBook, isOpen, onClose }: UpdateBookModalProps) {
    const form = useForm<IBookInput>()

    useEffect(() => {
        if (isOpen && updatedBook) {
            form.reset(updatedBook)
        }
    }, [isOpen, updatedBook, form])

    const genras = ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']

    const [updateBook] = useUpdateTaskMutation()

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const UpdatedParsedData = {
                ...data,
                copies: Number(data.copies)
            }

            const res = await updateBook({
                bookId: updatedBook?._id,
                updatedData: UpdatedParsedData
            }).unwrap()
            console.log(res)
            if (res?.success) {
                toast.success('Book successfully updated')
                onClose()
                form.reset()
            }
        } catch (error: any) {
            console.error('Book addition error', error)
            if (error?.data?.message?.includes('E11000') && error?.data?.message?.includes('isbn')
            ){
                toast.error("A book with this ISBN already exists");
            }else {
                toast.error(error?.data?.message || "Failed to update book");
            }
        }
    }

    return (
        <Dialog open={isOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-center">Add Book</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* book title */}
                        <FormField
                            control={form.control}
                            name="title"
                            rules={{ required: 'Title is required' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ''} placeholder="Book Title" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* book author  */}
                        <FormField
                            control={form.control}
                            name="author"
                            rules={{ required: "Author is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Author</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ''} placeholder="Book Author" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* genra  */}
                        <FormField
                            control={form.control}
                            name="genre"
                            rules={{ required: "Genre is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Genra</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={updatedBook?.genre}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Genra" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {genras.map((genra, index) => {
                                                        return <SelectItem key={index} value={genra}>{genra}</SelectItem>
                                                    })}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* book isbn  */}
                        <FormField
                            control={form.control}
                            name="isbn"
                            rules={{ required: "ISBN is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ISBN</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ''} placeholder="Book ISBN Number" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />


                        {/* description  */}
                        <FormField
                            control={form.control}
                            name="description"
                            rules={{ required: "Description is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} value={field.value || ''} placeholder="Book Description..." />
                                    </FormControl>
                                </FormItem>
                            )}
                        />


                        {/* book copies  */}
                        <FormField
                            control={form.control}
                            name="copies"
                            rules={{
                                required: "Copies are required",
                                min: {
                                    value: 0,
                                    message: 'Minimum vlaue is 0'
                                }
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Copies</FormLabel>
                                    <FormControl>
                                        <Input min={0} type='number' {...field} value={field.value || ''} placeholder="Number of Copies" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />



                        <DialogFooter className="mt-5">
                            <DialogClose asChild>
                                <Button onClick={() => {
                                    onClose()
                                }} variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button className="cursor-pointer" type="submit">Update Book</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateBookModal
