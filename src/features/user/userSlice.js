import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import {
    getUserFromLocalStorage,
    addUserToLocalStorage,
    removeUserLocalStorage,
}   from '../../utils/localStorage'

const initialState ={
    isLoading:false,
    isSidebarOpen:false,
    user:getUserFromLocalStorage()
}

export const registerUser = createAsyncThunk(
    'user/register',
    async(user,thunkApi) =>{
        try{
            const resp = await customFetch.post(
                '/auth/register',user
            );
            return resp.data;
        }
        catch(error){
            return thunkApi.rejectWithValue(error.response.data.msg)
        }
    }
)

export const loginUser = createAsyncThunk(
    'user/login',
    async(user,thunkApi) =>{
        try{
            const resp = await customFetch.post(
                '/auth/login',user
            );
            return resp.data;
        }
        catch(error){
            return thunkApi.rejectWithValue(error.response.data.msg)
        }
    }
)

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers:{
        toggleSidebar:(state)=>{
            state.isSidebarOpen = !state.isSidebarOpen
        },
        logoutUser: (state) => {
            state.user = null;
            state.isSidebarOpen = false;
            removeUserLocalStorage();
            
          },
    },
    extraReducers:{
        [registerUser.pending]:(state)=>{
            state.isLoading = true
        },
        [registerUser.fulfilled]:(state, {payload})=>{
            const {user} = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success(`Hello ${user.name}`);
        },
        [registerUser.rejected]:(state,{payload})=>{
            state.isLoading = false;
            toast.error(payload);
        },
        [loginUser.pending]:(state)=>{
            state.isLoading = true
        },
        [loginUser.fulfilled]:(state, {payload})=>{
            const {user} = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user)
            toast.success(`Selamat Datang Kembali ${user.name}`);
        },
        [loginUser.rejected]:(state,{payload})=>{
            state.isLoading = false;
            toast.error(payload);
        },
    }
})
export const {toggleSidebar, logoutUser} = userSlice.actions;
export default userSlice.reducer;