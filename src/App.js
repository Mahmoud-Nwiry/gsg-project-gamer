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
import Alert from './components/Alert';

const initAlert = {
  message: '',
  type: '',
  classes: '',
  isOpen: false,
}

class App extends Component {

  state = {
    isAuth: false,
    user: {},
    alert: initAlert,
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('gamerUser'));
    if (user) {
      this.setState({ isAuth: true, user: user })
    }
  }

  login = (user) => {
    this.setState({ isAuth: true, user: user });
  }

  logout = () => {
    this.setState({ isAuth: false, user: null })
    localStorage.removeItem('gamerUser');
  }

  alertOpen = (message, type, classes = '', timeout = 5000) => {
    this.setState({
      alert: {
        message,
        type,
        classes,
        isOpen: true,
      }
    })

    setTimeout(() => {
      this.setState({
        alert: {...initAlert}
      })
    },timeout)
  }

  render() {
    return (
      <>
        <Alert alert={this.state.alert}/>
        <Routes>
          <Route index element={this.state.isAuth ? <Navigate to={`/dashboard`} /> : <Navigate to="/login" />} />
          <Route path='/login' element={<Login login={this.login} alertOpen={this.alertOpen} />} />
          <Route path='/signup' element={<Signup alertOpen={this.alertOpen} />} />
          <Route path='/dashboard' element={<Layout isAuth={this.state.isAuth} logout={this.logout} />}>
            <Route index element={<Home alertOpen={this.alertOpen} />} />
            <Route path='profile' element={<Profile alertOpen={this.alertOpen} />} />
            <Route path='users' element={<Users alertOpen={this.alertOpen} />} />
            <Route path='users/:userId' element={<User alertOpen={this.alertOpen} />}
            />
          </Route>
          <Route path='*' element={<Error404 />} />
        </Routes>
      </>
    )
  }
}

export default App;
