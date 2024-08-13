import { createSlice } from '@reduxjs/toolkit';
import { createSetState } from '../utility';

export interface TaskType {
    id: number,
    title: string,
    description: string,
    dueDate: string,
    reminder: string,
    isImportant: boolean,
    recurrencePattern: string,
    createdAt: string,
    updatedAt: string,
    done: boolean,
    important: boolean
}


export interface TodoState {
    tasks: Array<TaskType>
    currentTask: TaskType
}

const initialState: TodoState = {
    tasks: [],
    currentTask: {
        id: 0,
        title: "",
        description: "",
        dueDate: "",
        reminder: "",
        isImportant: false,
        recurrencePattern: "",
        createdAt: "",
        updatedAt: "",
        done: false,
        important: false
    }
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTasks: createSetState('tasks'),
        setCurrentTask: createSetState('currentTask')
    },
});

export const taskActions = taskSlice.actions;

export default taskSlice.reducer;
