import React, { Component } from 'react';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup'

class App extends Component {

  state = {
    page: 'login'
  };

  handelPage = (page) => {
    this.setState({page: page});
  }

  render() {
    return (
      <div>
        {this.state.page === 'login' ? <Login changePage={this.handelPage} /> : this.state.page === 'signup' ? <Signup changePage={this.handelPage} /> : "Page not found"}
      </div>
    );
  }
}

export default App;
