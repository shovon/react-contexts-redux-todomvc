import * as React from 'react';
import { Component, KeyboardEvent, ChangeEvent } from 'react';

interface INewTodoInputProps {
  onAccept(text: string): void
}

interface INewTodoInputState {
  text: string
}

export default class NewTodoInput extends Component<
  INewTodoInputProps,
  INewTodoInputState
> {

  public state = {
    text: ''
  }

  // Keeping a reference to the HTML DOM element associated with the new to-do
  // input box.
  //
  // It turns out, React does not have support for autofocus.
  private input: HTMLInputElement | null;

  public componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  public render() {
    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13) {
        this.props.onAccept(this.state.text);
        this.setState({ text: '' });
      }
    };
    return (
      <input
        className='new-todo'
        placeholder='What needs to be done?'
        ref={input => { this.input = input; }}
        value={this.state.text}
        onChange={this.onEnterInputChange}
        onKeyDown={onKeyDown} />
    );
  }

  private onEnterInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ text: e.target.value });
  }
}
