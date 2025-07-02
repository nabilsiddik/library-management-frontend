import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:5000/api` }),
    tagTypes: ['book'],
    endpoints: (build) => ({
        getAllBooks: build.query({
            query: () => '/books',
            providesTags: ['book']
        }),
        createTask: build.mutation({
            query: (bookData) => ({
                url: '/books',
                method: 'POST',
                body: bookData,
            }),
            invalidatesTags: ['book']
        }),
        deleteBook: build.mutation({
            query: (id: string) => ({
                url: `/books/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['book']
        })
    })
})

export const { useGetAllBooksQuery, useCreateTaskMutation, useDeleteBookMutation } = baseApi