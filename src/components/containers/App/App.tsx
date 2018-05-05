import * as React from 'react';
import { Component } from 'react';
import { ITodosState } from '../../../modules/todos';
import TodoAppContext, { ITodoActions } from '../../../contexts/TodoAppContext';
import { createStore } from 'redux';
import * as Redux from 'redux';
import todosReducer, {
  create,
  deleteCompleted,
  deleteTodo,
  editTodo,
  toggleCompleteAll,
  toggleTodoCompletion
} from '../../../modules/todos';

interface IAppProps {};

const appStateKey = 'app.state';

export default class App extends Component<IAppProps, ITodosState> {

  private store: Redux.Store<ITodosState>
  private unsubscribe: Redux.Unsubscribe

  private actions: ITodoActions = {
    createTodo: title => {
      title = title.trim();
      if (title.length <= 0) { return; }
      this.store.dispatch(create(title));
    },
    deleteCompleted: () => {
      this.store.dispatch(deleteCompleted());
    },
    deleteTodo: id => {
      this.store.dispatch(deleteTodo(id));
    },
    editTodo: (id, newTitle) => {
      this.store.dispatch(editTodo(id, newTitle));
    },
    toggleCompleteAll: () => {
      this.store.dispatch(toggleCompleteAll());
    },
    toggleTodoCompletion: id => {
      this.store.dispatch(toggleTodoCompletion(id));
    }
  }

  constructor(props: IAppProps) {
    super(props);

    this.state = JSON.parse(
      localStorage.getItem(appStateKey) || JSON.stringify({ todos: [] })
    );
  }

  public componentDidMount() {
    this.store = createStore(todosReducer, this.state);
    this.unsubscribe = this.store.subscribe(() => {
      localStorage.setItem(appStateKey, JSON.stringify(this.store.getState()));
      console.log(this.store.getState());
      this.setState(this.store.getState());
    });
  }

  public componentWillUnmount() {
    this.unsubscribe();
  }

  public render() {
    return (
      <TodoAppContext.Provider value={{
        actions: this.actions,
        state: this.state
      }}>
        {this.props.children}
      </TodoAppContext.Provider>
    );
  }

}
