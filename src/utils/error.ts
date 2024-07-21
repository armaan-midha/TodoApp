import { AxiosResponseError } from '../service/axios';
import { appActions } from '../store/slice';
import store from '../store/store';

// Blame backend team for this. It is so hard to handle global errors in the frontend. I have to handle all the cases here.

export function handleError({
  error: e,
  defaultErrorMessage,
}: {
  error?: unknown;
  defaultErrorMessage?: string;
}) {
  const dispatch = store.dispatch;

  if (typeof e === 'string') {
    return dispatch(appActions.setPopupErrorNotification({ message: e }));
  }

  const { error } = e as { error: AxiosResponseError };

  if ('msg' in error && !('status' in error)) {
    return dispatch(
      appActions.setPopupErrorNotification({
        message:
          error?.msg ||
          defaultErrorMessage ||
          'Something went wrong. Please try again after sometime.',
      }),
    );
  }

  if (error.status === 'axiosError') {
    return dispatch(
      appActions.setPopupErrorNotification({
        message:
          error.msg ||
          defaultErrorMessage ||
          'Something went wrong. Please try again after sometime.',
      }),
    );
  }

  if (error.status === 'internalServerError') {
    return dispatch(
      appActions.setPopupErrorNotification({
        message:
          error.msg ||
          defaultErrorMessage ||
          'Something went wrong. Please try again after sometime.',
      }),
    );
  }

  if (error?.status === 'invalidResponse' || error?.status === 'unAuthorised') {
    return dispatch(
      appActions.setPopupErrorNotification({
        message:
          error.errors.message ||
          defaultErrorMessage ||
          'Something went wrong. Please try again after sometime.',
      }),
    );
  }

  if (error?.status === 'paramValidation') {
    if ('errors' in error) {
      let missingFieldsErrorMessage = error.errors.map(e => e.msg).join(', ');

      if (!missingFieldsErrorMessage) {
        missingFieldsErrorMessage = error.errors
          .map(e => `${e.field} missing.`)
          .join(', ');
      }

      if (!missingFieldsErrorMessage) {
        missingFieldsErrorMessage =
          defaultErrorMessage ||
          'Something went wrong. Please try again after sometime.';
      }

      return dispatch(
        appActions.setPopupErrorNotification({
          message: missingFieldsErrorMessage,
        }),
      );
    }

    if ('invalid_field' in error) {
      return dispatch(
        appActions.setPopupErrorNotification({
          message: error.invalid_field.errors.map(e => e.msg).join(', '),
        }),
      );
    }

    return dispatch(
      appActions.setPopupErrorNotification({
        message: error.invalid_fields.errors.map(e => e.msg).join(', '),
      }),
    );
  }

  if (error?.status === 'dataInvalid') {
    return dispatch(
      appActions.setPopupErrorNotification({
        message: Array.isArray(error?.errors)
          ? error.errors.map(e => e.msg).join(', ') ||
            defaultErrorMessage ||
            'Something went wrong. Please try again after sometime.'
          : error.errors.message ||
            defaultErrorMessage ||
            'Something went wrong. Please try again after sometime.',
      }),
    );
  }

  dispatch(
    appActions.setPopupErrorNotification({
      message:
        defaultErrorMessage || 'Something went wrong. Please try again later.',
    }),
  );
}
