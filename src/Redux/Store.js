import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Slice/AuthSclice"
import BeautyReducer from "./Slice/BeautySlice"

export const store= configureStore({
    reducer:{
        Auth:AuthReducer,
        Beauty:BeautyReducer
    }
})