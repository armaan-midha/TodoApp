import { StyleSheet } from 'react-native';
import React from 'react';
import { Snackbar } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { appActions } from '../store/slice';

export default function SnackBar() {
  const { popUpNotification } = useAppSelector(state => state.app);

  const { type, message } = popUpNotification;

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (!type || !message) {
      return;
    }

    const timeout = setTimeout(() => {
      dispatch(appActions.resetPopupNotification());
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [type, message, dispatch]);

  if (type === 'success') {
    return (
      <Snackbar
        visible={Boolean(message)}
        style={styles.baseToast}
        onDismiss={() => dispatch(appActions.resetPopupNotification())}
      >
        {message}
      </Snackbar>
    );
  }
  if (type === 'error') {
    return (
      <Snackbar
        visible={Boolean(message)}
        style={styles.errorToast}
        onDismiss={() => dispatch(appActions.resetPopupNotification())}
      >
        {message}
      </Snackbar>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  baseToast: {
    backgroundColor: '#5cb85c',
  },
  errorToast: {
    backgroundColor: '#d9534f',
  },
  infoToast: {
    backgroundColor: '#5bc0de',
  },
});
