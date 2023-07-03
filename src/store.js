import jobSlice from "./features/job/jobSlice";
import userSlice from "./features/user/userSlice";
import { configureStore } from '@reduxjs/toolkit';



export const store = configureStore({
    reducer:{
        user: userSlice,
        job: jobSlice
    }
})