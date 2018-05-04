import todosReducer, { ITodoItem, ITodosState } from './index';
import * as setsUtils from 'sets-utils';
import * as Random from 'random-js';
import * as assert from 'assert';

import {
  create,
  deleteCompleted,
  deleteTodo,
  editTodo,
  toggleCompleteAll,
  toggleTodoCompletion
} from './index';

/**
 * Just for the random number generator, for some random utilities in this test
 * file.
 */
const engine = Random.engines.nativeMath;

/**
 * Generates a random integer.
 * @param min The lowest possible value for the resulting integer
 * @param max The highest possible value for the resulting integer
 */
const randomInteger = (min: number, max: number): number =>
  Random.integer(min, max)(engine);

/**
 * Generates a random string.
 * @param minLength The smallest possible length for our string.
 * @param maxLength The largest possible length for our string.
 */
const randomString = (minLength: number, maxLength: number): string =>
  Random.string()(engine, randomInteger(minLength, maxLength));

/**
 * Creates a random todo item.
 * @param id The ID represented as a number, which will be used to derive the
 *   ID for the todo.
 * @param completionProbability The probability for which the todo will be
 *   marked as "complete"
 */
const createRandomTodo = (
  id: number,
  completionProbability: number = 0.5
): ITodoItem => ({
  id: id.toString(),
  title: randomString(5, 15),

  completed: Math.random() < completionProbability
});

/**
 * Generates an array.
 * @param length The number of elements in the resulting array.
 * @param creator The callback function that will return our value for an
 *   element
 */
const generateArray = <T>(length: number, creator: (i: number) => T) =>
  Array(length).fill(0).map((e, i) => creator(i));

/**
 * Generates multiple random todos.
 * @param minLength The smallest possible number of todos
 * @param maxLength The largest possible number of todos
 * @param completionProbability the probability for which a todo will be marked
 *   as complete.
 */
const createManyRandomTodos = (
  minLength: number = 5,
  maxLength: number = 15,
  completionProbability: number = 0.5
) =>
  generateArray(
    randomInteger(minLength, maxLength),
    i => createRandomTodo(i, completionProbability)
  );

it('should create new todos', () => {
  const titles = new Set(
    generateArray(randomInteger(5, 15), () => randomString(5, 15))
  );
  let state: ITodosState = { todos: [] };
  [...titles].forEach(t => { state = todosReducer(state, create(t)); })

  const titlesInList =
    new Set(state.todos.map(({ title }) => title));

  assert(setsUtils.setsEqual(titles, titlesInList), 'Should insert titles');
});

it('should delete all completed todos', async () => {
  const todos = createManyRandomTodos(5, 15);

  const incompleteTodos = todos.filter(t => !t.completed);

  let state = { todos };
  state = todosReducer(state, deleteCompleted());

  assert.deepStrictEqual(state, { todos: incompleteTodos });
});

it('should delete a specific todo', () => {
  const todos = createManyRandomTodos(5, 15);

  const specificTodo = todos[Random.integer(5, todos.length - 1)(engine)];

  const withoutSpecificTodo = todos.filter(t => t.id !== specificTodo.id);

  let state = { todos };
  state = todosReducer(state, deleteTodo(specificTodo.id));

  assert.deepStrictEqual(state, { todos: withoutSpecificTodo });
});

it('should edit a specific todo', () => {
  const todos = generateArray(randomInteger(5, 15), i => ({
    id: i.toString(),
    title: Random.string()(engine, Random.integer(5, 15)(engine)),

    completed: false
  }));

  const specificTodo = Object.assign(
    {},
    todos[Random.integer(5, todos.length - 1)(engine)],
    { title: Random.string()(engine, Random.integer(5, 15)(engine)) }
  );

  const todosWithModification = todos.map(t =>
    t.id === specificTodo.id ?
      specificTodo : t
  );

  let state = { todos };
  state = todosReducer(state, editTodo(specificTodo.id, specificTodo.title));

  assert.deepStrictEqual(state, { todos: todosWithModification });
});

it('should have it so that toggling "complete" all todos, if not all have been complete. Otherwise "uncomplete" them', () => {
  const todos = generateArray(
    randomInteger(5, 15),
    i => ({
      id: i.toString(),
      title: randomString(5, 15),

      completed: i % 2 !== 0
    })
  );

  let state = { todos };

  state = todosReducer(state, toggleCompleteAll());

  assert(state.todos.every(t => t.completed));

  state = todosReducer(state, toggleCompleteAll());

  assert(state.todos.every(t => !t.completed));
});

it('should allow us to toggle a particular todo', () => {
  const todos = createManyRandomTodos();

  let state = { todos };

  const oldTodo = todos[randomInteger(0, todos.length - 1)];

  state = todosReducer(state, toggleTodoCompletion(oldTodo.id));

  const newTodo1 = state
    .todos
    .filter(t => t.id === oldTodo.id)[0];

  assert.notStrictEqual(newTodo1.completed, oldTodo.completed);

  state = todosReducer(state, toggleTodoCompletion(oldTodo.id));

  const newTodo2 = state
    .todos
    .filter(t => t.id === oldTodo.id)[0];

  assert.strictEqual(newTodo2.completed, oldTodo.completed);
});
