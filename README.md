# React (+TypeScript) with React's Context API TodoMVC Example

An implementation of [TodoMVC](http://todomvc.com/), that is written with the use of React's new Context API.

## Running the example

```
npm install
npm start
```

## Code structure

We have contexts defined in the `contexts` folder, and components in the `components` folder.

## Some background on React Redux

With React, application developers began preferring a single a sources of truth to be placed on the highest level component in the dependency tree, and have parts of the truth trickle down to child components. The parent component is also responsible to pass event handlers to children.

When an event is triggered by a child component, the event needs to bubble up.

However, this yields potentially tightly coupled code. Change in the interface on a child component requires that the parent component adapts.

And so, react redux was introduced to mitigate this.

With React Redux, the "provider" component is what reacts to changes to the store, and it is also what passes state to child "Container" components. "Container" components are what gets the current state and event handlers from the store.

## How context differences from React Redux

With contexts, we have a concept of a producer and a consumer.

We initialize a producer with a container component's state, and then, child components are free to declare their render tree to include a consumer that will inject the producer's "state".