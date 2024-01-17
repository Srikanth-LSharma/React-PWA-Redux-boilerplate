import { aboutSlice } from './aboutSlice';
import { homeSlice } from './homeSlice';

const reducers = {
    about: aboutSlice.reducer,
    home: homeSlice.reducer
};

export default reducers;