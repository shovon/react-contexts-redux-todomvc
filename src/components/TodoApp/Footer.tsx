import * as React from 'react';
import TodoAppContext from '../../contexts/TodoAppContext';
import RouterContext from '../../contexts/RouterContext';
import Link from '../Link'

export default () => (
  <TodoAppContext.Consumer>
    {({ state, actions }) => {
      const { todos } = state;
      const deleteCompleted = () => { actions.deleteCompleted(); };
      return (
        <footer className='footer'>
          <span className='todo-count'>
            {todos.length === 1 ?
              '1 item left' :
              `${todos.filter(t => !t.completed).length} items left`}
          </span>

          <RouterContext.Consumer>
            {({ location }) => {
              return (
                <ul className='filters'>
                  <li>
                    <Link
                      to='/'
                      isActive={location.pathname === '/'}
                      activeClassName='selected'>
                      All
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/active'
                      isActive={location.pathname === '/active'}
                      activeClassName='selected'>
                      Active
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/completed'
                      isActive={location.pathname === '/completed'}
                      activeClassName='selected'>
                      Completed
                    </Link>
                  </li>
                </ul>
              );
            }}
          </RouterContext.Consumer>
          <button
            className='clear-completed'
            style={{
              display: todos.filter(t => t.completed).length > 0 ?
                'block' :
                  'none'
            }}
            onClick={deleteCompleted}>
            
            Clear completed
          </button>
        </footer>
      )
    }}
  </TodoAppContext.Consumer>
  
);