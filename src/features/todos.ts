/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTodos } from '../api';
import { Todo } from '../types/Todo';

type TodosState = {
  loaded: boolean;
  error: string;
  items: Todo[];
};

const initialState: TodosState = {
  loaded: false,
  error: '',
  items: [],
};

export const loadTodos = createAsyncThunk('todos/load', async () => {
  // function must return a Promise
  return getTodos();
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadTodos.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(loadTodos.fulfilled, (state, action) => {
      state.loaded = true;
      state.items.push(...action.payload);
    });

    builder.addCase(loadTodos.rejected, (state) => {
      state.error = 'Something went wrong';
      state.loaded = true;
    });
  },
});

export default todosSlice.reducer;
