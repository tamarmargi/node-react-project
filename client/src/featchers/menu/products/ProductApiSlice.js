import apiSlice from "../../../app/ApiSlice";

const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllProducts: build.query({
            query: () => ({
                url: '/api/product'
            }),
            providesTags: ["Category"]
        }),
        createProduct: build.mutation({
            query: (product) => ({
                url: '/api/product',
                method: "POST",
                body: product   
            }),
            invalidatesTags: ["Category"]
        }),
        deleteProduct: build.mutation({
            query: ({categoryId, productId} ) => ({
                url: `/api/product/${categoryId}/${productId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Category"]
        }),
        updateProduct: build.mutation({
            query: (product) => ({
                url: `/api/product/update`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ["Category"]
        }),
        getProductById: build.query({
            query: ({ categoryId, productId }) => ({
                url: `/api/product/${categoryId}/${productId}`
            })
        })
    }),
   
})

export const {
    useGetAllProductsQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
    useGetProductByIdQuery
} = productApiSlice;
