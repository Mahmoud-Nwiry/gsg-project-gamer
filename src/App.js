import React, { Component } from 'react';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup'

class App extends Component {

  state = {
    page: 'logins'
  };

  handelPage = (page) => {
    this.setState({page: page});
  }

  render() {
    return (
      <div>
        {this.state.page === 'login' ? <Login changePage={this.handelPage} /> : <Signup changePage={this.handelPage} />}
      </div>
    );
  }
}

export default App;
