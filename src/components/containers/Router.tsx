import * as React from 'react';
import { Component } from 'react';
import RouterContext from '../../contexts/RouterContext'
import * as history from 'history';

interface IRouterState {
  location: history.Location
}

export default class Router extends Component<{}, IRouterState> {

  private historyObject: history.History
  private unlisten: history.UnregisterCallback

  constructor(props: {}) {
    super(props);
    this.state = {
      location: history.createLocation('/')
    };
  }

  public componentDidMount() {
    this.historyObject = history.createHashHistory();
    this.setState({ location: this.historyObject.location });
    this.unlisten = this.historyObject.listen((location, action) => {
      this.setState({ location });
    });
  }

  public componentWillUnmount() {
    this.unlisten();
  }

  public render() {
    return (
      <RouterContext.Provider value={{
        history: this.historyObject,        
        location: this.state.location
      }}>
        {this.props.children}
      </RouterContext.Provider>
    );
  }

}
