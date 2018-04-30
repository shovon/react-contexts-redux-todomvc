import { createContext } from 'react';
import { Location, History, createMemoryHistory, createLocation } from 'history';

export interface IRouterContext {
  location: Location
  history: History
}

export default createContext<IRouterContext>({
  history: createMemoryHistory(),  
  location: createLocation('/')
});
