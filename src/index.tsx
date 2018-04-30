import App from './components/App';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'todomvc-app-css/index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
