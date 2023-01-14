import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css';

import Login from './pages/Login';
import Signup from './pages/Signup'
import Home from './pages/Home'; 
import Profile from './pages/Profile'; 
import Users from './pages/Users'; 
import User from './pages/User'; 
import Error404 from './pages/Error404';
import Layout from './layout';

class App extends Component {

  state = {
    isAuth : false,
    user : {}
  }

  componentDidMount(){
    const user = JSON.parse(localStorage.getItem('gamerUser'));
    if(user){
      this.setState({isAuth :true, user : user })
    }
  }

  login = (user) => {
    this.setState({ isAuth : true, user : user});
  }

  logout = () => {
    this.setState({isAuth : false, user :null})
    localStorage.removeItem('gamerUser');
  }

  render () {
    return (
      <Routes>
        <Route index element={this.state.isAuth ? <Navigate to={`/dashboard`} /> : <Navigate to="/login" />} />
        <Route path='/login' element={<Login login={this.login} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Layout isAuth={this.state.isAuth} />}>
          <Route index element={<Home />} />
          <Route path='profile' element={<Profile />} />
          <Route path='users' element={<Users />} />
          <Route path='users/:userId' element={<User />}
           />
        </Route>
        <Route path='*' element={<Error404 />} />
      </Routes>
    )
  }
}

export default App;
