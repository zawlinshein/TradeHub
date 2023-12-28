import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type loginUser = {
    _id: number | null;
    name: string | null;
    email: string | null;
}

type action = {
  type: string;
    payLoad: any
}

const initialState: loginUser = {
  _id: null,
  name: null,
  email: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login(state, action: PayloadAction<loginUser>) {
      state;
    },
    logOut(state) {
      state;
    },
  },
});

export const {login, logOut} = loginSlice.actions
export default loginSlice.reducer
