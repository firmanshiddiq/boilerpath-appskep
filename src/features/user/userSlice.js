import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
    getUserFromLocalStorage,
    addUserToLocalStorage,
    removeUserLocalStorage,
}   from '../../utils/localStorage'
import { clearStoreThunk, loginUserThunk, registerUserThunk, updateUserThunk } from './userThunk';



const initialState ={
    isLoading:false,
    isSidebarOpen:false,
    user:getUserFromLocalStorage()
}

export const clearStore = createAsyncThunk(
    'user/clearStore',
    clearStoreThunk
)

export const registerUser = createAsyncThunk(
    'user/register',
    async(user,thunkApi) =>{
        return registerUserThunk('/auth/register', user, thunkApi);
    }
)

export const loginUser = createAsyncThunk(
    'user/login',
    async(user,thunkApi) =>{
        return loginUserThunk('/auth/login', user, thunkApi);
    }
)

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (user, thunkApi) => {
        return updateUserThunk('/auth/updateUser', user, thunkApi);
    }
)

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers:{
        toggleSidebar:(state)=>{
            state.isSidebarOpen = !state.isSidebarOpen
        },
        logoutUser: (state,{payload}) => {
            state.user = null;
            state.isSidebarOpen = false;
            removeUserLocalStorage();
            if(payload){
                toast.success(payload);
            }
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
        [updateUser.pending]:(state)=>{
            state.isLoading = true
        },
        [updateUser.fulfilled]:(state, {payload})=>{
            const {user} = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user)
            toast.success('User Update!');
        },
        [updateUser.rejected]:(state,{payload})=>{
            state.isLoading = false;
            toast.error(payload);
        },
        [clearStore.rejected]:()=>{
            toast.error('Terdapat kesalahan...');
        },
    }
})
export const {toggleSidebar, logoutUser} = userSlice.actions;
export default userSlice.reducer;