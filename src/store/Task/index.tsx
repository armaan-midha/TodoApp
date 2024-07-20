// reducers/todoSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: [],
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        // add more reducers as needed
    },
});

export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;
