import axiosInstance from '@/lib/Axios';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { AppDispatch } from '@/app/store';
import { reduxStorage } from '@/app/storage';

type loginUser = {
  id: number | null;
  name: string | null;
  email: string | null;
  password: string | null;
};

type action = {
  type: string;
  payLoad: any;
};

const initialState: loginUser = {
  id: null,
  name: null,
  email: null,
  password: null,
};

export const tryLogin =
  (userData: {email: string, password: string}) => async (dispatch: AppDispatch) => {
    try {
      const response = await axiosInstance.get(
        `/users?email=${userData.email}&password=${userData.password}`,
      );

      console.log(response);
      console.log(response.data);

      dispatch(login(response.data));
    } catch (error) {
      console.log('error when try to login user : ',error)
      throw error
    }
  };

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login(state, action: PayloadAction<loginUser>) {
      return {...state, ...action.payload};
    },
    logOut(state) {
      console.log('user is logging out', state, initialState)
      const data = reduxStorage.getItem('persist:root')._j;

      const parsedData = JSON.parse(data);
      console.log(parsedData.auth ? true: false)
      return initialState;
    },
  },
});

export const {login, logOut} = loginSlice.actions;
export default loginSlice.reducer;
