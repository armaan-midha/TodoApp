import config from '../config';
import { appActions } from '../store/slice';
import store from '../store/store';
import { TokenManager } from '../utils/auth';
import Axios, { AxiosError, AxiosResponse } from 'axios';
import * as ObjectMapper from 'object-mapper';

Axios.defaults.headers.post['Content-Type'] = 'application/json';

export const axiosInstance = Axios.create({
  timeout: 30 * 60, // 60 seconds
});

export type AxiosResponseError =
  | { msg: string | null }
  | {
      status: 'paramValidation';
      errors: Array<{ field: string; msg: string | null }>;
    }
  | {
      status: 'paramValidation';
      invalid_field: {
        errors: Array<{
          field: string;
          msg: string | null;
        }>;
      };
    }
  | {
      status: 'invalidResponse';
      errors: {
        message: string | null;
      };
    }
  | {
      status: 'unAuthorised';
      errors: {
        message: string | null;
      };
    }
  | {
      status: 'paramValidation';
      invalid_fields: {
        errors: Array<{
          field: string;
          msg: string | null;
        }>;
      };
    }
  | {
      status: 'dataInvalid';
      errors:
        | [
            {
              field: string;
              msg: string | null;
            },
          ]
        | {
            message: string | null;
          };
    }
  | {
      status: 'internalServerError'; // This is error message is not provided by backend. It is only for frontend use.
      msg: string | null;
    }
  // TODO fix this later
  | {
      status: 'axiosError'; // This is error message is not provided by backend. It is only for frontend use.
      msg: string | null;
    };

// axiosInstance.interceptors.request.use(
//   function (config) {
//     config.headers.set(
//       'Authorization',
//       `Bearer ${store.getState().login.auth.token}`,
//     );

//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   },
// );

function logAxiosErrorResponse(error: AxiosError) {
  // Logging values should not cause problem so wrapped this with try catch

  try {
    console.log(`

    ---------------------------------------< Error Response >-------------------------------------------
    URL: ${error.response?.config.url}
    Status: ${error?.response?.status} 
    ---------------------------------------------< End >-----------------------------------------------------

    `);
  } catch {
    /* empty */
  }
}

function logAxiosResponse(response: AxiosResponse<any, any>) {
  // Logging values should not cause problem so wrapped this with try catch

  try {
    console.log(`

  -----------------------------------------< Success Response >---------------------------------------
  URL: ${response?.config.url}
  Status: ${response?.status} 
  ------------------------------------------------< End >-----------------------------------------------

  `);
  } catch {
    /* empty */
  }
}

axiosInstance.interceptors.response.use(
  function (response) {
    if (config.logAxiosResponse) logAxiosResponse(response);

    return response;
  },
  function (error: AxiosError) {
    if (config.logAxiosErrorResponse) logAxiosErrorResponse(error);

    if (error?.response?.status === 401) {
    //   store.dispatch(loginActions.setAuth({ token: '' }));

      store.dispatch(
        appActions.setPopupErrorNotification({ message: 'Session expired.' }),
      );

      TokenManager.reset();
    }

    const response = error.response;

    let data = response?.data as AxiosResponseError;

    // If the get the response as html and the status code is 500 we're setting the status to internal server error
    if (typeof data === 'string' && error.request.status === 500) {
      data = {
        status: 'internalServerError',
        msg: 'Internal server error. Please try again after sometime.',
      };
    }

    // TODO - convert the error here to usable format
    return Promise.reject(data);
  },
);

export function processPayload<ReturnType>(payload: unknown, mapper: object) {
  return ObjectMapper.merge((payload as object) ?? {}, mapper) as ReturnType;
}

export function composeResponseData<ResponseType>(
  response: AxiosResponse<ResponseType>,
): {
  status: number;
  data: ResponseType;
} {
  return {
    status: response.status,
    data: response.data,
  };
}

export const enum APIResponseStatus {
  Success = 'success',
  Failed = 'failed',
}

function createAPIResponse<TData>(
  type: 'success',
  data: TData,
  error: null,
): { status: 'success'; data: TData; error: null };
function createAPIResponse<TError>(
  type: 'error',
  data: null,
  error: TError,
): { status: 'error'; data: null; error: TError };
function createAPIResponse<TData, TError>(
  type: 'success' | 'error',
  data: TData,
  error: TError,
) {
  if (type === 'success') {
    return {
      data,
      status: 'success',
      error: null,
    };
  }

  return {
    data: null,
    status: 'error',
    error: error,
  };
}

export const APIResponse = {
  success: <TData,>(data: TData) =>
    Promise.resolve(createAPIResponse('success', data, null)),
  error: <TError,>(error: TError) =>
    Promise.reject(
      createAPIResponse('error', null, error as AxiosResponseError),
    ),
};

export default axiosInstance;
