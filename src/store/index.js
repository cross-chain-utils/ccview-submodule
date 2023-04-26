import userSlice from './user'
import cacheSlice from './webcache'
//import uiSlice from './ui'
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: { user: userSlice, cache: cacheSlice } //
});

export default store;