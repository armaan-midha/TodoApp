import { createSlice } from '@reduxjs/toolkit';
import { createSetState } from '../utility';

export interface TaskListType {
    id: number,
    name: string,
    icon: string,
    iconColour: string,
    deletable: boolean,
}


export interface TaskState {
    taskList: Array<TaskListType>
}

const initialState: TaskState = {
    taskList: [],
};

const taskList = createSlice({
    name: 'taskList',
    initialState,
    reducers: {
        setTaskList: createSetState('taskList'),
    },
});

export const taskListActions = taskList.actions;

export default taskList.reducer;
