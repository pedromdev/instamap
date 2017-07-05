import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router';
import Routes from '../Routes';

class Root extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired
  };

  render() {
    return (
      <Router history={this.props.history} routes={Routes} />
    );
  }
}

export default Root;