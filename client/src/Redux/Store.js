import { configureStore } from "@reduxjs/toolkit";
import authReducer from './AuthSlice'
import PostReducer from './PostSlice'

export const Store = configureStore({
    reducer:{
        authReducer,
        PostReducer
    }
})