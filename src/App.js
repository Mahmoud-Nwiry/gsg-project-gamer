import { useRoutes } from 'react-router-dom'
import './App.css';

import Login from './pages/Login';
import Signup from './pages/Signup'
import Home from './pages/Home'; 
import Error404 from './pages/Error404'; 

const App = () => {

  let routes = useRoutes([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/dashboard/:id',
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup/>
    },
    {
      path: '*',
      element: <Error404 />
    }
  ])

  return routes
}

export default App;
