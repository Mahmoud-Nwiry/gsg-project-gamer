import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css';

import Login from './pages/Login';
import Signup from './pages/Signup'
import Home from './pages/Home'; 
import Profile from './pages/Profile'; 
import Error404 from './pages/Error404';
import Layout from './layout';

class App extends Component {

  state = {
    isAuth : false,
    userId : null,
  }

  componentDidMount(){
    const user = localStorage.getItem('gamerUser');
    if(user){
      this.setState({isAuth :true, userId : JSON.parse(user)._id});
    }
  }

  login = (id) => {
    this.setState({ isAuth : true, userId : id});
  }

  logout = () => {
    this.setState({isAuth : false, userId :null})
    localStorage.removeItem('gamerUser');
  }

  render () {
    return (
      <Routes>
        <Route index element={this.state.isAuth ? <Navigate to={`/dashboard/${this.state.userId}`} /> : <Navigate to="/login" />} />
        <Route path='/login' element={<Login login={this.login} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard/:id' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='*' element={<Error404 />} />
      </Routes>
    )
  }
}

export default App;
