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
        updateTask: build.mutation({
            query: ({bookId, updatedData}) => ({
                url: `/books/${bookId}`,
                method: 'PUT',
                body: updatedData
            }),
            invalidatesTags: ['book']
        }),
        deleteBook: build.mutation({
            query: (id: string) => ({
                url: `/books/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['book']
        }),
        createBorrow: build.mutation({
            query: (borrowData) => ({
                url: '/borrow',
                method: 'POST',
                body: borrowData,
            }),
            invalidatesTags: ['book']
        }),
        borrowedSummery: build.query({
            query: () => '/borrow'
        })
    })
})

export const { useGetAllBooksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteBookMutation, useCreateBorrowMutation, useBorrowedSummeryQuery } = baseApi