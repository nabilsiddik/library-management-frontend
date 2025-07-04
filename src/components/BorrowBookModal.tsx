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
import { useCreateBorrowMutation } from "@/redux/api/baseApi"
import { toast } from 'react-toastify';
import type { BorrowBookModalProps } from "@/interfaces/BorrowBookModalProps.interface"
import type { IBorrow } from "@/interfaces/borrow.interface"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "./ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useNavigate } from "react-router"

export function BorrowBookModal({ borrowedBookId, isOpen, onClose }: BorrowBookModalProps) {
    const form = useForm<IBorrow>()
    const [createBorrow] = useCreateBorrowMutation()
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const res = await createBorrow({ ...data, borrowedBookId }).unwrap()
            if (res.success) {
                toast.success('Book successfully borrowed')
                onClose()
                form.reset()
                navigate('/borrow-summary')
            }
        }catch(error: any){
            console.error('Borrowing Error', error)
            toast.error(error?.data?.message || 'Book borrowing failed')
        }
    }

    return (
        <Dialog open={isOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-center">Borrow Book</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* book quantity  */}
                        <FormField
                            control={form.control}
                            name="quantity"
                            rules={{ required: "Quantity is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quantity</FormLabel>
                                    <FormControl>
                                        <Input min={1} type='number' {...field} value={field.value || ''} placeholder="Number of Quantity" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* due date */}
                        <FormField
                            control={form.control}
                            name="dueDate"
                            rules={{ required: 'Date is required' }}
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
                        />

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
