import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

import Error from '../error';

export default class ErrorBoundry extends Component {
  state = {
    error: false
  };

  componentDidCatch() {
    this.setState({
      error: true
    });
  }

  render() {
    if (this.state.error) {
      return (
        <CSSTransition
          in={this.state.error}
          timeout={250}
          classNames={'message'}
          mountOnEnter
          unmountOnExit
        >
          <Error message="Something went wrong..." />
        </CSSTransition>
      );
    }

    return this.props.children;
  }
}
