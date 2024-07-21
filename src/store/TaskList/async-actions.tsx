import { createAsyncThunk } from "@reduxjs/toolkit";
import { CONTEXT_ID, appActions } from "../slice";
import { API } from "../../service";
import { taskListActions } from ".";
import { handleError } from "../../utils/error";


export const fetchTaskLists = createAsyncThunk(
    'fetchTaskLists',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(appActions.setContextualLoadingState({
            loading: true,
            id: CONTEXT_ID.GET_TASK_LIST,
            message: "Fetching Task Lists"
        }))
        try {
            const { data } = await API.getTaskLists();
            thunkAPI.dispatch(taskListActions.setTaskList(data));
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

export const deleteTaskList = createAsyncThunk(
    'deleteTaskList',
    async (id: number, thunkAPI) => {
        thunkAPI.dispatch(appActions.setContextualLoadingState({
            loading: true,
            id: CONTEXT_ID.GET_TASK_LIST,
            message: "Deleting Task Lists"
        }))
        try {
            await API.delteTaskList(id);
            await thunkAPI.dispatch(fetchTaskLists());
        } catch (error) {
            handleError({
                error,
                defaultErrorMessage: "Failed to delete task list"
            });
        } finally {
            thunkAPI.dispatch(appActions.setContextualLoadingState({
                loading: false,
                id: CONTEXT_ID.GET_TASK_LIST,
                message: "Deleting Task Lists"
            }))
        }

    }
)

export const createTaskList = createAsyncThunk(
    'createTaskList',
    async (name: string, thunkAPI) => {
        thunkAPI.dispatch(appActions.setContextualLoadingState({
            loading: true,
            id: CONTEXT_ID.GET_TASK_LIST,
            message: "Creating Task List"
        }))
        try {
            const response = await API.createTaskList({name});
            await thunkAPI.dispatch(fetchTaskLists());
        } catch (error) {
            console.log(error);
            
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