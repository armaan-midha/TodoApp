import {Action, ThunkAction, configureStore} from '@reduxjs/toolkit';
import appReducer from './slice';
import taskListReducer from './TaskList'
import taskReducer from './Task';



export function makeStore() {
  return configureStore({
    reducer: {
      app: appReducer,
      taskList: taskListReducer,
      task: taskReducer,
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
