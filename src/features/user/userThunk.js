import customFetch from '../../utils/axios';
import { logoutUser } from './userSlice';

export const registerUserThunk = async (url, user, thunkApi) => {
    try {
      const resp = await customFetch.post(url, user);
      return resp.data;
    } 
    catch (error) {
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
};

export const loginUserThunk = async (url, user, thunkApi) => {
    try{
        const resp = await customFetch.post(url,user);
        return resp.data;
    }
    catch(error){
        return thunkApi.rejectWithValue(error.response.data.msg)
    }
};

export const updateUserThunk = async (url, user, thunkApi) => {
    try {
      const resp = await customFetch.patch(url, user, {
        headers: {
          authorization: `Bearer ${thunkApi.getState().user.user.token}`,
        },
      });
      return resp.data;
    } 
    catch (error) {
      if (error.response.status === 401) {
        thunkApi.dispatch(logoutUser());
        return thunkApi.rejectWithValue('Unauthorized! Logging Out...');
      }
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
};