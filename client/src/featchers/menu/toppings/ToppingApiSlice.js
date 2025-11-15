import apiSlice from "../../../app/ApiSlice";

const toppingApiSlice=apiSlice.injectEndpoints({
    endpoints: (build)=>({
        createTopping: build.mutation({
            query: (topping)=>({
                url:'/api/toppings',
                method:"POST",
                body:topping
            }),
            invalidatesTags:["Category"]
        }),
        deleteTopping: build.mutation({
            query: ({categoryId,productId,extraId,toppingId})=>({
                url:`/api/toppings/${categoryId}/${productId}/${extraId}/${toppingId}`,
                method:"DELETE"
            }),
            invalidatesTags: ["Category"]
        }),
        updateTopping: build.mutation({
            query: (topping)=>({
                url:'/api/toppings/update',
                method:"POST",
                body:topping
            }),
            invalidatesTags:["Category"]
        }),
        getToppingById: build.query({
            query: ({categoryId,productId,extraId,toppingId})=>({
               url:`/api/toppings/${categoryId}/${productId}/${extraId}/${toppingId}`,
            })
        })
    })
})

export const{
    useCreateToppingMutation,
    useDeleteToppingMutation,
    useUpdateToppingMutation,
    useGetToppingByIdQuery
} = toppingApiSlice