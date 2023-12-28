import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loginReducer from '../features/signin&out/loginSlice'
import catReducer from '../features/signin&out/anotherSlice'

const rootReducer = combineReducers({
    auth: loginReducer,
    cat: catReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>