import {Action, ThunkAction, configureStore} from '@reduxjs/toolkit';
import appReducer from './slice';
import taskListReducer from './TaskList'


export function makeStore() {
  return configureStore({
    reducer: {
      app: appReducer,
      taskList: taskListReducer,
    },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppDispatch,
  unknown,
  Action<string>
>;

let reduxStore: null | typeof store = null;

export const getReduxStore = () => {
  if (!reduxStore) {
    reduxStore = store;
  }
  return reduxStore;
};

export default store;
