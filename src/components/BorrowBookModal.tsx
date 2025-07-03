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
import type { IBookInput } from "@/interfaces/book.interface"
import { ToastContainer, toast } from 'react-toastify';
import type { BorrowBookModalProps } from "@/interfaces/BorrowBookModalProps.interface"
import type { IBorrow } from "@/interfaces/borrow.interface"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "./ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

export function BorrowBookModal({ borrowedBookId, isOpen, onClose }: BorrowBookModalProps) {
    const form = useForm<IBorrow>()

    // toast notification
    const notify = (message: string) => toast(message);


    // useEffect(() => {
    //     if(isOpen && updatedBook){
    //         form.reset(updatedBook)
    //     }
    // }, [isOpen, updatedBook, form])

    const [updateBook] = useUpdateTaskMutation()

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        // const UpdatedParsedData = {
        //     ...data,
        //     copies: Number(data.copies)
        // }

        // const res = await updateBook({
        //     bookId: updatedBook?._id,
        //     updatedData: UpdatedParsedData
        // }).unwrap()
        // console.log(res)
        // if (res?.success) {
        //     notify('Book successfully updated')
        //     onClose()
        //     form.reset()
        // } else {
        //     notify('Book update failed')
        // }
    }

    return (
        <Dialog open={isOpen}>
            <ToastContainer />
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-center">Borrow Book</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* book copies  */}
                        <FormField
                            control={form.control}
                            name="quantity"
                            rules={{ required: "Quantity is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Copies</FormLabel>
                                    <FormControl>
                                        <Input type='number' {...field} value={field.value || ''} placeholder="Number of Quantity" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* due date */}
                        {/* <FormField
                            control={form.control}
                            name="dueDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Borrow Due Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                captionLayout="dropdown"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormItem>
                            )}
                        /> */}

                        <DialogFooter className="mt-5">
                            <DialogClose asChild>
                                <Button onClick={() => {
                                    onClose()
                                }} variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button className="cursor-pointer" type="submit">Borrow Book</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default BorrowBookModal
