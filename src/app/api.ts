import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getUser: builder.query<User, number>({
      query: (id) => `users/${id}.json`,
    }),
    getTodos: builder.query<Todo[], void>({
      query: () => 'todos.json',
    }),
    addTodo: builder.mutation<Todo, Omit<Todo, 'id'>>({
      query: (todoData) => ({
        url: 'todos',
        method: 'POST',
        body: todoData,
      }),
    }),
  }),
});

export const { useGetTodosQuery, useGetUserQuery, useAddTodoMutation } = api;
