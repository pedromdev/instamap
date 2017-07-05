import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class AuthorizationButton extends Component {

  render() {
    return (
      <a
        className={"authorization-button button-" + this.props.type}
        href={this.props.url || "#"}
        style={this.props.style || {}}
      >
        <FontAwesome name={this.props.type} />
        {this.props.children}
      </a>
    );
  }
}

export default AuthorizationButton;