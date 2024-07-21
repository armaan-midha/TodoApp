import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSetState } from './utility';
import { useAppSelector } from './hooks';

export const enum CONTEXT_ID {
  GET_TASK_LIST,
}

type ShowNotificationModalType = { message: string } & (
  | { show: true; type: 'error' | 'success' }
  | { show: false; type: 'error' | 'success' | null }
);

export interface AppState {
  navigate: {
    path: string;
    reset: boolean;
  };
  showResourceNotFoundModal: boolean;
  showNotificationModal: ShowNotificationModalType;
  contextualLoadingState: {
    id: CONTEXT_ID | null;
    loading: boolean;
    message?: string;
  };
  popUpNotification: {
    type: 'success' | 'error' | null;
    message: string;
  };
}

const initialState: AppState = {
  showResourceNotFoundModal: false,
  navigate: {
    path: '',
    reset: false,
  },
  showNotificationModal: {
    show: false,
    message: '',
    type: null,
  },
  contextualLoadingState: {
    id: null,
    loading: false,
    message: '',
  },
  popUpNotification: {
    type: null,
    message: '',
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setContextualLoadingState: createSetState('contextualLoadingState'),
    setShowNotificationModal: createSetState('showNotificationModal'),
    resetNotificationModal(state: AppState) {
      state.showNotificationModal = { type: null, message: '', show: false };
    },
    resetPopupNotification(state: AppState) {
      state.popUpNotification = { type: null, message: '' };
    },
    setPopupErrorNotification(
      state: AppState,
      action: PayloadAction<{ message: string }>,
    ) {
      state.popUpNotification.type = 'error';
      state.popUpNotification.message = action.payload.message;
    },
    setPopupSuccessNotification(
      state: AppState,
      action: PayloadAction<{ message: string }>,
    ) {
      state.popUpNotification.type = 'success';
      state.popUpNotification.message = action.payload.message;
    }
  },
});

export const appActions = appSlice.actions;

export function useIsLoading(contextId: CONTEXT_ID) {
  const { loading, id } = useAppSelector(
    state => state.app.contextualLoadingState,
  );

  return { isLoading: loading && id === contextId };
}

export default appSlice.reducer;
