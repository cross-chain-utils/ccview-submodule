import { userSlice, cacheSlice } from '../dclib'

import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: { user: userSlice, cache: cacheSlice } //
});

export default store;