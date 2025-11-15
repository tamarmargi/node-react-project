import {configureStore} from "@reduxjs/toolkit"
import apiSlice from "./ApiSlice"
import authSliceReducer from "./AuthSlice"

const store = configureStore({
    reducer:{
        auth:authSliceReducer,
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

export default store