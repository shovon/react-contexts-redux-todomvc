import TodoApp from './components/presentations/TodoApp'
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'todomvc-app-css/index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <TodoApp />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
