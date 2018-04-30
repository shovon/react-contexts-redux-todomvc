import * as React from 'react';
import { Component, DetailedHTMLProps, AnchorHTMLAttributes } from 'react';
import RouterContext from '../contexts/RouterContext';

type AnchorProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>

type LinkProps = AnchorProps & {
  to: string,
  isActive?: boolean
  activeClassName?: string
};

export default class Link<T> extends Component<LinkProps> {
  public render() {
    const { to, isActive, activeClassName, ...anchorProps } = this.props;
    const { onClick, className } = anchorProps;

    const newClassName = isActive ?

      (className || '')
        .split(' ')
        .concat([ activeClassName || 'active' ])
        .join(' ') :

      className;

    return (
      <RouterContext.Consumer>
        {({ history }) => {
          const onAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            if (onClick) { onClick(e); }
            history.push(to);
          };
          return (
            <a
              {...anchorProps}
              className={newClassName}
              onClick={onAnchorClick} />
          );
        }}
      </RouterContext.Consumer>
    );
  }
}
