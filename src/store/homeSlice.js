import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: []
};

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setData: (state, action) => {
            const { solver } = action?.payload;
            state?.data?.push(solver);
        }
    }
});

export const { setData } = homeSlice.actions;