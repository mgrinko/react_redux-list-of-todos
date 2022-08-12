/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type SelectedTodoState = Todo | null;

const selectedTodoSlice = createSlice({
  name: 'selectedTodo',
  initialState: null as SelectedTodoState,
  reducers: {
    setTodo: (_, action: PayloadAction<Todo>) => action.payload,
    clearTodo: () => null,
  },
});

export default selectedTodoSlice.reducer;
export const { setTodo, clearTodo } = selectedTodoSlice.actions;
