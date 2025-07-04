import App from "@/App";
import AddBook from "@/pages/AddBook";
import AllBooks from "@/pages/AllBooks";
import BorrowSummary from "@/pages/BorrowSummary";
import {
    createBrowserRouter,
} from "react-router";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <AllBooks />
            },
            {
                path: '/create-book',
                element: <AddBook />
            },
            {
                path: '/borrow-summary',
                element: <BorrowSummary />
            },
        ]
    }
])

export default router