import customFetch from "../../utils/axios";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { logoutUser } from "../user/userSlice";


const initialState = {
    isLoading: false,
    position: '',
    company: '',
    jobLocation: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    isEditing: false,
    editJobId: '',
};

export const createJob = createAsyncThunk(
    'job/createJob',
    async(job, thunkApi)=>{
        try {
            const resp = await customFetch.post('/jobs', job, {
              headers: {
                Authorization: `Bearer ${thunkApi.getState().user.user.token}`,
              },
            });
            thunkApi.dispatch(clearValues());
            return resp.data;
          } catch (error) {
            
            // logout user
            if (error.response.status === 401) {
                thunkApi.dispatch(logoutUser());
                return thunkApi.rejectWithValue('Unauthorized! Logging Out...');
            }
          return thunkApi.rejectWithValue(error.response.data.msg);
          }
    }
);

const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers:{
        handleChange: (state, { payload: { name, value } }) => {
            state[name] = value;
        },
        clearValues: ()=>{
            return {
                ...initialState,jobLocation:getUserFromLocalStorage()?.location || ''
            } 
        }
    },
    extraReducers:{
        [createJob.pending]: (state) => {
            state.isLoading = true;
        },
        [createJob.fulfilled]: (state) => {
            state.isLoading = false;
            toast.success('Job berhasil di buat');
        },
        [createJob.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
        },
    }
});

 

  export const { handleChange,clearValues } = jobSlice.actions;
  export default jobSlice.reducer;