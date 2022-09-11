import { configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo } from "./types";

export const api = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  tagTypes: ["todo"],
  endpoints: (builder) => ({
    getAllTodos: builder.query<Required<Todo>[], void>({
      query: () => `/todos`,
      providesTags: ["todo"],
    }),
    postTodo: builder.mutation<Required<Todo>, Todo>({
      query: ({ id, ...rest }) => ({
        url: "/todos",
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["todo"],
    }),
    patchTodo: builder.mutation<string, Omit<Required<Todo>, "name">>({
      query: ({ id, completed }) => ({
        url: "/todos",
        method: "PATCH",
        body: { id, completed },
      }),
      invalidatesTags: ["todo"],
    }),
    deleteTodos: builder.mutation<string, { ids: number[] }>({
      query: ({ ids }) => ({
        url: "/todos",
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: ["todo"],
    }),
  }),
});

export const {
  useGetAllTodosQuery,
  usePostTodoMutation,
  usePatchTodoMutation,
  useDeleteTodosMutation,
} = api;

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [api.reducerPath]: api.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
