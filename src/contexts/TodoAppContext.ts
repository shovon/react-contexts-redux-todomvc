import { createContext } from 'react';
import { ITodosState } from '../modules/todos';

export interface ITodoActions {
  createTodo: (title: string) => void
  deleteCompleted: () => void
  deleteTodo: (id: string) => void
  editTodo: (id: string, newTitle: string) => void
  toggleCompleteAll: () => void  
  toggleTodoCompletion: (id: string) => void
};

export interface ITodoAppContextProps {
  actions: ITodoActions
  state: ITodosState
};

const uninmplementedFunction = () => { throw new Error('Not implemented!'); };

export default createContext<ITodoAppContextProps>({
  actions: {
    createTodo: uninmplementedFunction,
    deleteCompleted: uninmplementedFunction,
    deleteTodo: uninmplementedFunction,
    editTodo: uninmplementedFunction,
    toggleCompleteAll: uninmplementedFunction,
    toggleTodoCompletion: uninmplementedFunction
  },
  state: {
    todos: []
  }
});
