import { createSlice } from "@reduxjs/toolkit";

const initialCatState = {
    meowing: false
}

const catSlice = createSlice({
    name: 'cat',
    initialState: initialCatState,
    reducers: {
        meow(state) {
            state.meowing = true;
        }
    }
})

export const {meow} = catSlice.actions

export default catSlice.reducer