import customFetch from "../../utils/axios";
import { getAllJobs, hideLoading, showLoading } from "../allJobs/allJobsSlice";
import { clearValues } from "./jobSlice";

export const createJobThunk = async(job, thunkApi)=>{
    try {
        const resp = await customFetch.post('/jobs', job, {
          headers: {
                authorization: `Bearer ${thunkApi.getState().user.user.token}`,
          },
        });
        thunkApi.dispatch(clearValues());
        return resp.data;
    } 
      catch (error) {
        return thunkApi.rejectWithValue(error.response.data.msg);
      }
}

export const deleteJobThunk = async(jobId,thunkApi) => {
    thunkApi.dispatch(showLoading());
    try {
        const resp = await customFetch.delete(`/jobs/${jobId}`, {
            headers: {
                authorization: `Bearer ${thunkApi.getState().user.user.token}`,
            },
        });
        thunkApi.dispatch(getAllJobs());
        return resp.data.msg;
    }
    catch (error) {
        thunkApi.dispatch(hideLoading());
        return thunkApi.rejectWithValue(error.response.data.msg);
    }
}

export const editJobThunk =  async({job,jobId},thunkApi) => {
    try{
        const resp = await customFetch.patch(`/jobs/${jobId}`, job, {
            headers: {
              authorization: `Bearer ${thunkApi.getState().user.user.token}`,
            },
        });
        thunkApi.dispatch(clearValues());
        return resp.data;
    }
    catch(error){
        return thunkApi.rejectWithValue(error.response.data.msg);

    }
}