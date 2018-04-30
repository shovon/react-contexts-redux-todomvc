import * as React from 'react';
import { Component } from 'react';
import TodoAppContext, { ITodoState, ITodoActions } from '../../contexts/TodoAppContext';
import TodoApp from '../TodoApp';
import Router from '../Router';

interface IAppProps {};

const appStateKey = 'app.state';

export default class App extends Component<IAppProps, ITodoState> {

  // Maintain an auto-incrementing ID for the count.
  private count: number = 0;

  private actions: ITodoActions;

  constructor(props: IAppProps) {
    super(props);

    this.state = JSON.parse(
      localStorage.getItem(appStateKey) ||
      JSON.stringify({
        todos: []
      })
    );

    this.count = this.state.todos.reduce((prev, { id }) => {
      const next = parseInt(id, 10);
      return next >= prev ? next + 1 : prev;
    }, 0);

    this.actions = {
      createTodo: title => {
        title = title.trim();
        if (title.length <= 0) { return; }
        const oldCount = this.count;
        this.count += 1;
        this.updateState({
          todos: this.state.todos.concat([{
            completed: false,            
            id: oldCount.toString(),
            title
          }])
        })
      },
      deleteCompleted: () => {
        this.updateState({
          todos: this.state.todos.filter(t => !t.completed)
        })
      },
      deleteTodo: id => {
        this.updateState({ todos: this.state.todos.filter(t => t.id !== id) });
      },
      editTodo: (id, newTitle) => {
        this.updateState({
          todos: this.state.todos.map(t =>
            t.id === id ?
              Object.assign({}, t, { title: newTitle }) :
                t
          )
        });
      },
      toggleCompleteAll: () => {
        const allCompleted = this.state.todos.every(todo => todo.completed)
        this.updateState({
          todos: this.state.todos.map(
            todo => Object.assign({}, todo, { completed: !allCompleted })
          )
        })
      },
      toggleTodoCompletion: id => {
        this.updateState({
          todos: this.state.todos.map(
            todo =>
              todo.id === id ?
                Object.assign({}, todo, { completed: !todo.completed }) :
                  todo
          )
        })
      }
    };
  }

  public render() {
    return (
      <TodoAppContext.Provider value={{
        actions: this.actions,
        state: this.state
      }}>
        <Router>
          <TodoApp />
        </Router>
      </TodoAppContext.Provider>
    );
  }

  private updateState(delta: ITodoState) {
    this.setState(delta, () => {
      localStorage.setItem(appStateKey, JSON.stringify(this.state));
    });
  }
}
