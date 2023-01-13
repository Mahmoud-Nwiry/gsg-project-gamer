import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css';

import Login from './pages/Login';
import Signup from './pages/Signup'
import Home from './pages/Home'; 
import Error404 from './pages/Error404';

class App extends Component {

  state = {
    isAuth : true,
    userId : null,
  }

  render () {
    return (
      <Routes>
        <Route index element={this.state.isAuth ? <Navigate to={`/dashboard/${this.state.userId}`} /> : <Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard/:id' element={<Home />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    )
  }
}

export default App;
