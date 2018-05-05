# React (+TypeScript) with React's Context API TodoMVC Example

An implementation of [TodoMVC](http://todomvc.com/), that is written with the use of [React](https://reactjs.org/)'s new [Context API](https://reactjs.org/docs/context.html) as well as [Redux](https://redux.js.org/).

## Running the example

```
npm install
npm start
```

## Code structure

```
contexts
modules
components
    containers
    presentations
```

We have contexts defined in the `contexts` folder, Redux "concerns" (or "models", or "domains"; whatever you'd like to call it) in the `modules` folder, and components in the `components` folder.

Additionally, `components` is subdivided into two component types: `containers` and `presentations`.

As the name implies, `containers` holds ["React-Redux-like" container components](https://redux.js.org/basics/usage-with-react#implementing-container-components), whereas `presentations` holds presentational containers (components that are not directly involved with directly initializing stores, nor handling events that are reconciled with the store; they were formerly known as "dumb components"). However, there is a subtle distinction between the "container" components in React Redux, and the one introduced in this project, which will be discussed below.

## Some background on React Redux

With React, application developers began preferring a single sources of truth to be placed on the highest level component in the dependency tree, and have parts of the truth trickle down to child components. The parent component is also responsible to pass event handlers to children.

When an event is triggered by a child component, the event needs to bubble up.

However, this yields potentially tightly coupled code. A change in the interface on a child component requires that the parent component adapts.

And so, React Redux was introduced to mitigate this.

With React Redux, the "provider" component is what responds to changes to the store, and it is also what passes state to child "Container" components. "Container" components are what gets the current state and event handlers from the store. There can exist multiple container components, none of which require that a parent component pass state down to the children.

## How contexts + Redux differs from React Redux

With contexts, we have providers and consumers. Parent ***providers*** define what properties will be passed on to child ***consumers***.

With React Redux, on the other hand, we have a provider component that passes the current store's state and the dispatcher to child container components.

The subtle difference, here, is that passed-down onto child consumers by parent providers is more explicit with React's contexts. Where as, this is not the case with React Redux.

With contexts, code is much easier to reason about. Indeed, when using TypeScript with React's context, we are no longer required to define properties as optional. This was not the case with React Redux, where we do not explicitly provide props to containers, which, as a result, raises errors when TypeScript is used, and that the props are not defined as optional.

Overall, with contexts, we gain the ability to explicitly declare properties as being required.

Best of all, since this example application is using Redux, we also gain the ability to use [Redux DevTools on Chrome](https://github.com/reduxjs/redux-devtools), which is great for debuggin purposes.