// store.js

import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './index'; // import your root reducer

const store = configureStore({
  reducer: rootReducer,
  // optionally add middleware, dev tools configuration, etc.
});

export default store;
