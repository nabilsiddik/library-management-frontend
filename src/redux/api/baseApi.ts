import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({baseUrl: `http://localhost:5000/api`}),
    endpoints: (build) => ({
        getAllBooks: build.query({
            query: () => '/books'
        }),
        createTask: build.mutation({
            query: (taskData) => ({
                url: '/books',
                method: 'POST',
                body: taskData,
            })

        })
    })
})

export const {useGetAllBooksQuery, useCreateTaskMutation} = baseApi