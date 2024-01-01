import axiosInstance from '@/lib/Axios';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch} from '@/app/store';

type loginUser = {
  _id: number | null;
  name: string | null;
  email: string | null;
  password: string | null;
};

type action = {
  type: string;
  payLoad: any;
};

const initialState: loginUser = {
  _id: null,
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
      return initialState;
    },
  },
});

export const {login, logOut} = loginSlice.actions;
export default loginSlice.reducer;
