import * as React from 'react'
import { Component } from 'react';
import TodoAppContext from '../../contexts/TodoAppContext';
import Footer from './Footer';
import TodoList from './TodoList';
import NewTodoInput from './NewTodoInput';

interface ITodoAppProps {};
interface ITodoAppState {
  newTodoText: string
};

export default class TodoApp extends Component<ITodoAppProps, ITodoAppState> {

  constructor(props: ITodoAppProps) {
    super(props);
    
    this.state = {
      newTodoText: ''
    };
  }

  public render() {
    return (
      <TodoAppContext.Consumer>
        {({ state, actions }) => (
          <>
            <section className='todoapp'>
              <header className='header'>
                <h1>todos</h1>
                <NewTodoInput onAccept={actions.createTodo} />
              </header>

              <section
                className='main'
                style={{ display: state.todos.length > 0 ? 'block' : 'none' }}>

                <input
                  id='toggle-all'
                  className='toggle-all'
                  type='checkbox'
                  checked={!state.todos.some(todo => !todo.completed)}
                  onChange={actions.toggleCompleteAll} />

                <label htmlFor='toggle-all'>Mark all as complete</label>

                <TodoList />
                <Footer />
              </section>
            </section>
            <footer className="info">
              <p>Double-click to edit a todo</p>
              <p>Written by <a href="http://twitter.com/shovon">Sal Rahman</a></p>
              <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
            </footer>
          </>
        )}
      </TodoAppContext.Consumer>
    );
  }

}
