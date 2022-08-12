import { getTodos } from '../api';
import { todosActions } from '../features/todos';
import { AppDispatch } from './store';

export const loadTodos = () => {
  return (dispatch: AppDispatch) => {
    dispatch(todosActions.startLoading());

    getTodos()
      .then(todosFromServer => {
        dispatch(todosActions.setTodos(todosFromServer));
        dispatch(todosActions.finishLoading());
      });
  };
};
