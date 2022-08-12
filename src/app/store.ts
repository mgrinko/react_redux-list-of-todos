import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import selectedTodoReducer from '../features/selectedTodo';
import todosReducer from '../features/todos';
import { api } from './api';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    selectedTodo: selectedTodoReducer,
    [api.reducerPath]: api.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
