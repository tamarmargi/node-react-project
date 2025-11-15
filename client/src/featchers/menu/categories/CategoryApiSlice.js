
import apiSlice from "../../../app/ApiSlice";

const categryApiSlice = apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getAllCategories:build.query({
            query:()=>({
                url:'/api/category'
            }),
            providesTags:["Category"]
        }),
        createCategory:build.mutation({
            query:(category)=>({
                url:'/api/category',
                method:"POST",
                body:category
            }),
            invalidatesTags:["Category"]
        }),
        deleteCategory:build.mutation({
            query:(categoryId)=>({
                url:`/api/category/${categoryId}`,
                method:"DELETE"
            }),
            invalidatesTags:["Category"]
        }),
        // updateCategory:build.mutation({
        //     query:(category)=>({
        //         url:'/api/category/update',
        //         method:"POST",
        //         body:category
        //     }),
        //     invalidatesTags:["Category"]
        // }),
        // getCategoryById:build.query({
        //     query:(categoryId)=>({
        //         url:`/api/category/${categoryId}`,
        //     }),
        //     providesTags:["Category"]
        // })

    }),
})

export const {
    useGetAllCategoriesQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
    useGetCategoryByIdQuery
} = categryApiSlice