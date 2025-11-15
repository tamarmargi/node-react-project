
import apiSlice
 from "../../app/ApiSlice"
const busketApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getBusketById: build.query({
            query: () => ({
                url: '/api/basket'
            }),
            providesTags: ["Busket"]
        }),
        addToBusket: build.mutation({
            query: (details)=>({
                url:`/api/basket`,
                method:"POST",
                body:details
            }),
            invalidatesTags:["Busket"]
        }),
        addTopping:build.mutation({
            query:(details)=>({
                url:"/api/basket/topping",
                method:"POST",
                body:details
            }),
            invalidatesTags:["Busket"]
        }),
        deleteProductFromBasket: build.mutation({
            query: (productId)=>({
                url: `/api/basket/${productId}`,
                method:"DELETE"
            }),
            invalidatesTags:["Busket"]
        }),
        lessAmount: build.mutation({
            query:(details)=>({
                url:"/api/basket/lessAmount",
                method:"POST", 
                body: details
            }),
            invalidatesTags:["Busket"]
        })
    })
})

export const {
    useGetBusketByIdQuery,
    useAddToBusketMutation,
    useAddToppingMutation,
    useDeleteProductFromBasketMutation,
    useLessAmountMutation
} = busketApiSlice