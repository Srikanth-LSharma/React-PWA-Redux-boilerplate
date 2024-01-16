import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: {},
    sampleArray: []
};

export const aboutSlice = createSlice({
    name: 'about',
    initialState,
    reducers: {
        setData: (state, action) => {
            const { user } = action.payload;
            state.user = user;
        }
    }
});

// eslint-disable-next-line import/no-unused-modules
export const { setData } = aboutSlice.actions;