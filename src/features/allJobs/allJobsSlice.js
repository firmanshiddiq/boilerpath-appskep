import customFetch from "../../utils/axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk(
  'allJobs/getJobs',
  async(_,thunkApi)=>{
    let url = `/jobs`;
    try {
      const resp = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkApi.getState().user.user.token}`,
        },
      });
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
)

const allJobsSlice = createSlice({
    name: 'allJobs',
    initialState,
    reducers:{
      showLoading: (state) =>{
        state.isLoading = true;
      },
      hideLoading: (state) =>{
        state.isLoading = true;
      }
    },
    extraReducers:{
      [getAllJobs.pending]: (state) => {
        state.isLoading = true;
      },
      [getAllJobs.fulfilled]: (state, { payload }) => {
        state.isLoading = false;
        state.jobs = payload.jobs;
      },
      [getAllJobs.rejected]: (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      },
    }
});


export const {showLoading, hideLoading} = allJobsSlice.actions;
export default allJobsSlice.reducer;