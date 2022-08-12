import classNames from 'classnames';
import React from 'react';
import { Loader } from './Loader';
import { Todo } from '../types/Todo';
import { useGetUserQuery } from '../app/api';

type Props = {
  todo: Todo;
  onClose?: () => void,
};

export const TodoModal: React.FC<Props> = ({
  todo,
  onClose = () => {},
}) => {
  const { data: user, isLoading, isError } = useGetUserQuery(todo.userId);

  return (
    <div className="modal is-active">
      <div className="modal-background" />

      {isLoading && <Loader />}

      {isError && <p>Error occurred</p>}

      {user && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div className="modal-card-title has-text-weight-medium">
              Todo&nbsp;#
              {todo.id}
            </div>
            <a href="#close" className="delete" onClick={onClose}>Close</a>
          </header>

          <div className="modal-card-body">
            <p className="block">{todo.title}</p>

            <p className="block">
              <strong
                className={classNames({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
              >
                {todo.completed ? 'Done' : 'Planned'}
              </strong>
              {' by '}
              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
