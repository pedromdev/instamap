import React, { Component } from 'react';
import logo from './logo.svg';

class App extends Component {
  
  render() {
    
    return (
      <div className="App">
        <div className="App-header">
          <h2>
            Instamap
            <img src={logo} className="App-logo" alt="logo" />
          </h2>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default App;