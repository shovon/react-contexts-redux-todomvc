import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

class LocalStorageMock {
  private store: any;
  constructor() {
    this.store = {};
  }

  public clear() {
    this.store = {};
  }

  public getItem(key: string) {
    return this.store[key] || null;
  }

  public setItem(key: string, value: any) {
    this.store[key] = value.toString();
  }

  public removeItem(key: string) {
    delete this.store[key];
  }
};

namespace NodeJS {
  export type Global = {
    localStorage: LocalStorageMock
  }
}

declare var global: NodeJS.Global;

global.localStorage = new LocalStorageMock;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
