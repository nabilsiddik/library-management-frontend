import { Button } from "@/components/ui/button"
import { useGetBookByIdQuery } from "@/redux/api/baseApi"
import { useParams } from "react-router"

const SingleBook = () => {
    const { id } = useParams()
    const { data, isLoading } = useGetBookByIdQuery(id)

    if (isLoading) return <h3 className="font-bold text-xl">Loading ...</h3>

    const { title, description, isbn, author, genre, copies, available } = data.data

    return (
        <div className="w-full lg:w-8/12 mx-auto">
            <h1 className="mb-6 font-bold text-3xl text-center">Book Details</h1>
            {data &&
                <div className="text-center">
                    <h1 className="font-bold text-center mb-2">{title} - Writer {author}</h1>
                    <p className="text-sm">ISBN Number: {isbn}</p>
                    <p className="text-sm">{copies} Copies Available</p>
                    <p className="text-sm">Status - {available ? 'Available' : 'Unavailable'}</p>
                    <Button className="mt-1">{genre}</Button>
                    <p className="text-sm mt-5">{description}</p>
                </div>
            }
        </div>
    )
}

export default SingleBook
