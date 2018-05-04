import { Action } from 'redux';

type ACTION_CREATE = 'todos/CREATE';
type ACTION_DELETE_COMPLETED = 'todos/DELETE_COMPLETED';
type ACTION_DELETE_TODO = 'todos/DELETE_TODO';
type ACIION_EDIT_TODO = 'todos/EDIT_TODO';
type ACTION_TOGGLE_COMPLETE_ALL = 'todos/TOGGLE_COMPLETE_ALL';
type ACTION_TOGGLE_TODO_COMPLETION = 'todos/TOGGLE_TODO_COMPLETION';

const CREATE: ACTION_CREATE = 'todos/CREATE';
const DELETE_COMPLETED: ACTION_DELETE_COMPLETED = 'todos/DELETE_COMPLETED';
const DELETE_TODO: ACTION_DELETE_TODO = 'todos/DELETE_TODO';
const EDIT_TODO: ACIION_EDIT_TODO = 'todos/EDIT_TODO';
const TOGGLE_COMPLETE_ALL: ACTION_TOGGLE_COMPLETE_ALL =
  'todos/TOGGLE_COMPLETE_ALL';
const TOGGLE_TODO_COMPLETION: ACTION_TOGGLE_TODO_COMPLETION =
  'todos/TOGGLE_TODO_COMPLETION';

export type TodoItemIdType = string;

export interface ITodoItem {
  id: TodoItemIdType
  title: string
  completed: boolean
}

export interface ITodosState {
  todos: ITodoItem[]
}

interface ITodosAction extends Action {

  type:
    ACTION_CREATE |
    ACTION_DELETE_COMPLETED |
    ACTION_DELETE_TODO |
    ACIION_EDIT_TODO |
    ACTION_TOGGLE_COMPLETE_ALL |
    ACTION_TOGGLE_TODO_COMPLETION

}

interface ICreateAction extends ITodosAction {
  type: ACTION_CREATE
  title: string
}

interface IDeleteCompletedAction extends ITodosAction {
  type: ACTION_DELETE_COMPLETED
}

interface IDeleteTodo extends ITodosAction {
  type: ACTION_DELETE_TODO
  id: TodoItemIdType
}

interface IEditTodo extends ITodosAction {
  type: ACIION_EDIT_TODO
  id: TodoItemIdType
  title: string
}

interface IToggleCompleteAll extends ITodosAction {
  type: ACTION_TOGGLE_COMPLETE_ALL
}

interface IToggleTodoCompletion extends ITodosAction {
  type: ACTION_TOGGLE_TODO_COMPLETION,
  id: TodoItemIdType
}

export const defaultState: ITodosState = Object.freeze({
  todos: []
});

export default function reducer(
  state: ITodosState = defaultState,
  action: ITodosAction
): ITodosState {

   switch (action.type) {
    case CREATE: {
      const createAction = action as ICreateAction;
      return Object.assign({}, state, {
        todos: state.todos.concat([
          {
            id: (state.todos.reduce((prev, next) => {
              const idInt = parseInt(next.id, 10);
              return idInt > prev ? idInt : prev
            }, 0) + 1).toString(),
            title: createAction.title,

            completed: false
          }
        ])
      });
    }
      
    case DELETE_COMPLETED:
      return Object.assign({}, state, {
        todos: state.todos.filter(t => !t.completed)
      });
    case DELETE_TODO: {
      const deleteAction = action as IDeleteTodo;
      return Object.assign({}, state, {
        todos: state.todos.filter(t => t.id !== deleteAction.id)
      });
    }
    case EDIT_TODO: {
      const editAction = action as IEditTodo;
      return Object.assign({}, state, {
        todos: state.todos.map(t => t.id === editAction.id ?
          Object.assign({}, t, {
            title: editAction.title
          }) : t
        )
      });
    }
    case TOGGLE_COMPLETE_ALL: {
      const someOutstanding = state.todos.some(t => !t.completed);
      return Object.assign({}, state, {
        todos: state.todos.map(t => Object.assign({}, t, {
          completed: someOutstanding
        }))
      });
    }
    case TOGGLE_TODO_COMPLETION: {
      const toggleTodoCompletionAction = action as IToggleTodoCompletion;
      return Object.assign({}, state, {
        todos: state.todos.map(t =>
          t.id === toggleTodoCompletionAction.id ?
            Object.assign({}, t, { completed: !t.completed }) :
              t
        )
      });
    }
   }
}

export const create = (title: string): ICreateAction => ({
  type: CREATE,

  title
});

export const deleteCompleted = (): IDeleteCompletedAction => ({
  type: DELETE_COMPLETED
});

export const deleteTodo = (id: TodoItemIdType): IDeleteTodo => ({
  type: DELETE_TODO,

  id
});

export const editTodo = (id: TodoItemIdType, title: string): IEditTodo => ({
  type: EDIT_TODO,

  id,
  title
});

export const toggleCompleteAll = (): IToggleCompleteAll => ({
  type: TOGGLE_COMPLETE_ALL
});

export const toggleTodoCompletion = (
  id: TodoItemIdType
): IToggleTodoCompletion => ({
  type: TOGGLE_TODO_COMPLETION,

  id
});
