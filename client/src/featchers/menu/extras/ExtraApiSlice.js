import apiSlice from "../../../app/ApiSlice";

const extraApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        createExtra: build.mutation({
            query: (extra) => ({
                url: '/api/extras',
                method: "POST",
                body:extra
            }),
            invalidatesTags:["Category"]
        }),
        deleteExtra: build.mutation({
            query: ({categoryId,productId,extraId})=>({
                url:`api/extras/${categoryId}/${productId}/${extraId}`,
                method:"DELETE"
            }),
            invalidatesTags:["Category"]
        }),
        updateExtrar: build.mutation({
            query: (extra)=>({
                url:`/api/extras/update`,
                method:"POST",
                body:extra
            }),
            invalidatesTags:["Category"]
        }),
        getExtraById: build.query({
            query: ({categoryId,productId,extraId})=>({
                url:`api/extras/${categoryId}/${productId}/${extraId}`
            })
        })
    })
})

export const {
    useCreateExtraMutation,
    useDeleteExtraMutation,
    useUpdateExtrarMutation,
    useGetExtraByIdQuery
} = extraApiSlice