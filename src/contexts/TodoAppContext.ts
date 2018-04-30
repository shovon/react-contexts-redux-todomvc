import { createContext } from 'react';

export interface ITodoItem {
  id: string
  title: string
  completed: boolean
};

export interface ITodoState {
  todos: ITodoItem[]
};

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
  state: ITodoState
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
