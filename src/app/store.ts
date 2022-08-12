import { configureStore } from '@reduxjs/toolkit';
import selectedTodoReducer from '../features/selectedTodo';
import todosReducer from '../features/todos';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    selectedTodo: selectedTodoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
