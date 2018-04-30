import * as React from 'react';
import { Component } from 'react';
import { ITodoItem } from '../../contexts/TodoAppContext';
import './Todo.css';

interface ITodoProps {
  onTitleEdit: (newTitle: string) => void
  onToggleCompletion?: () => void
  onDelete?: () => void
}

interface ITodoState {
  editing: boolean
}

export default class Todo extends Component<ITodoItem & ITodoProps, ITodoState> {

  public state = {
    editing: false
  }

  public render() {
    const classes = [
      this.props.completed ? 'completed' : null,
      this.state.editing ? 'editing' : null
    ].filter(cls => cls !== null).join(' ')

    return (
      <li className={classes}>
        <input
          className='toggle'
          type='checkbox'
          checked={this.props.completed}
          onChange={this.onToggle} />
        <label
          onDoubleClick={this.toggleEditMode}>{this.props.title}</label>
        <button className='destroy' onClick={this.onDelete}>
          {}
        </button>
        {this.state.editing ?
          <input
            className='edit'
            onBlur={this.disableEditMode}
            onKeyDown={this.editKeyDown}
            defaultValue={this.props.title}
            ref={input => {
              if (input) {
                input.focus();
              }
            }} /> :
            null}
      </li>
    );
  }

  private disableEditMode = () => {
    this.setState({ editing: false });
  }

  private onToggle = () => {
    if (this.props.onToggleCompletion) {
      this.props.onToggleCompletion();
    }
  }
  
  private onDelete = () => {
    if (this.props.onDelete) {
      this.props.onDelete();
    }
  }

  private toggleEditMode = () => {
    this.setState({ editing: !this.state.editing });
  }

  private editKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      const value = (e.target as any).value as string;
      this.props.onTitleEdit(value);
      this.disableEditMode();
    }
  }
}
