/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import './App.scss';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Status } from './types/Status';
import { useAppSelector } from './app/hooks';
import { loadTodos } from './app/thunk';
import { clearTodo } from './features/selectedTodo';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const { items: todos, loaded } = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.selectedTodo);

  const clearSelection = () => {
    dispatch(clearTodo());
  };

  useEffect(() => {
    dispatch(loadTodos());
  }, []);

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Status>('all');
  const lowerQuery = query.toLowerCase();

  const visibleTodos = todos.filter(todo => {
    if (status === 'active' && todo.completed) {
      return false;
    }

    if (status === 'completed' && !todo.completed) {
      return false;
    }

    return todo.title.toLowerCase().includes(lowerQuery);
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChanged={setQuery}
                status={status}
                onStatusChanged={setStatus}
              />
            </div>

            <div className="block">
              {loaded ? (
                <TodoList todos={visibleTodos} />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={clearSelection}
        />
      )}
    </>
  );
};
