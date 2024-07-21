import { createSlice } from '@reduxjs/toolkit';
import { createSetState } from '../utility';

interface TaskType {
    id: number,
    title: string,
    description: string,
    dueDate: string,
    reminder: string,
    isRecurring: boolean,
    recurrencePattern: string | null,
    createdAt: string,
    updatedAt: string,
    done: boolean,
    recurring: boolean
}


export interface TodoState {
    task: Array<TaskType>
}

const initialState : TodoState = {
    task: [],
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTask: createSetState('task')
    },
});

export const taskActions = taskSlice.actions;

export default taskSlice.reducer;
