import { createAsyncThunk } from "@reduxjs/toolkit";
import { CONTEXT_ID, appActions } from "../slice";
import { TaskType, taskActions } from ".";
import { API } from "../../service";
import { handleError } from "../../utils/error";

export const fetchTasks = createAsyncThunk(
    'fetchTaskLists',
    async (payload: { taskListId: number }, thunkAPI) => {
        thunkAPI.dispatch(appActions.setContextualLoadingState({
            loading: true,
            id: CONTEXT_ID.GET_TASK_LIST,
            message: "Fetching Task Lists"
        }))
        try {
            const { data } = await API.getTasks(payload.taskListId);
            thunkAPI.dispatch(taskActions.setTasks(data));
        } catch (error) {
            handleError({
                error,
                defaultErrorMessage: "Failed to get Task Lists"
            });
        } finally {
            thunkAPI.dispatch(appActions.setContextualLoadingState({
                loading: false,
                id: CONTEXT_ID.GET_TASK_LIST,
                message: "Fetching Task Lists"
            }))
        }

    }
)

export const deleteTask = createAsyncThunk(
    'deleteTask',
    async (payload: { id: number, taskListId: number }, thunkAPI) => {

        thunkAPI.dispatch(appActions.setContextualLoadingState({
            loading: true,
            id: CONTEXT_ID.GET_TASK_LIST,
            message: "Deleting Task"
        }))
        try {
            await API.delteTask(payload.id);
            await thunkAPI.dispatch(fetchTasks({ taskListId: payload.taskListId }));
        } catch (error) {
            handleError({
                error,
                defaultErrorMessage: "Failed to delete task"
            });
        } finally {
            thunkAPI.dispatch(appActions.setContextualLoadingState({
                loading: false,
                id: CONTEXT_ID.GET_TASK_LIST,
                message: "Deleting Task"
            }))
        }

    }
)

export const updateTask = createAsyncThunk(
    'updateTask',
    async (payload: { task: Partial<TaskType>, taskListId: number }, thunkAPI) => {
        thunkAPI.dispatch(appActions.setContextualLoadingState({
            loading: true,
            id: CONTEXT_ID.GET_TASK_LIST,
            message: "Deleting Task"
        }))

        try {
            await API.updateTask(payload.task);
            await thunkAPI.dispatch(fetchTasks({ taskListId: payload.taskListId }));
            await thunkAPI.dispatch(fetchTask({ taskId: payload.task.id ?? 0 }))

        } catch (error) {
            handleError({
                error,
                defaultErrorMessage: "Failed to delete task"
            });
        } finally {
            thunkAPI.dispatch(appActions.setContextualLoadingState({
                loading: false,
                id: CONTEXT_ID.GET_TASK_LIST,
                message: "Deleting Task"
            }))
        }

    }
)

export const createTask = createAsyncThunk(
    'createTask',
    async (payload: { task: Pick<TaskType, 'title'>, taskListId: number }, thunkAPI) => {
        thunkAPI.dispatch(appActions.setContextualLoadingState({
            loading: true,
            id: CONTEXT_ID.GET_TASK_LIST,
            message: "Creating Task List"
        }))
        try {
            const updatedPayload = { ...payload.task, taskListId: payload.taskListId };

            const response = await API.createTask(updatedPayload);
            await thunkAPI.dispatch(fetchTasks({ taskListId: payload.taskListId }));
        } catch (error) {
            handleError({
                error,
                defaultErrorMessage: "Failed to create task list"
            });
        } finally {
            thunkAPI.dispatch(appActions.setContextualLoadingState({
                loading: false,
                id: CONTEXT_ID.GET_TASK_LIST,
                message: "Creating Task List"
            }))
        }

    }
)

export const fetchTask = createAsyncThunk(
    'fetchTaskLists',
    async (payload: { taskId: number }, thunkAPI) => {
        thunkAPI.dispatch(appActions.setContextualLoadingState({
            loading: true,
            id: CONTEXT_ID.GET_TASK_LIST,
            message: "Fetching Task"
        }))
        try {
            const { data } = await API.getTask(payload.taskId);
            thunkAPI.dispatch(taskActions.setCurrentTask(data));
        } catch (error) {
            handleError({
                error,
                defaultErrorMessage: "Failed to get Task Lists"
            });
        } finally {
            thunkAPI.dispatch(appActions.setContextualLoadingState({
                loading: false,
                id: CONTEXT_ID.GET_TASK_LIST,
                message: "Fetching Task Lists"
            }))
        }

    }
)
