import * as React from 'react';
import Todo from './Todo';
import RouterContext from '../../../contexts/RouterContext';
import TodoAppContext from '../../../contexts/TodoAppContext';

export default () => (
  <TodoAppContext.Consumer>
    {({ state, actions }) => (
      <ul className='todo-list'>
        <RouterContext.Consumer>
          {({ location }) => {
            return state.todos
              .filter(todo => {
                switch (location.pathname) {
                  case '/active':
                    return !todo.completed;
                  case '/completed':
                    return todo.completed;
                default:
                  return true
                }
              })
              .map(todo => {
                const onToggleCompletion = () => {
                  actions.toggleTodoCompletion(todo.id);
                };
                const onDelete = () => {
                  actions.deleteTodo(todo.id);
                };
                const onTitleEdit = (newTitle: string) => {
                  actions.editTodo(todo.id, newTitle);
                };
                return (
                  <Todo
                    key={todo.id}
                    onToggleCompletion={onToggleCompletion}
                    onDelete={onDelete}
                    onTitleEdit={onTitleEdit}
                    {...todo} />
                )
              });
          }}
        </RouterContext.Consumer>
      </ul>
    )}
  </TodoAppContext.Consumer>
);
