import { Outlet, useParams } from 'react-router-dom'
import './layout.css'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

import Image from '../assets/images/pirsonal.png'
 
import users from '../mock/users'

const Layout = ({children}) => {

    const {id} = useParams()

    const user = users.find(user => user.id === Number(id));

    return (
      <div className='layout'>
        <Sidebar />
        <div className="right_side">
            <Navbar firstName={user?.firstName} image={Image}  />
            <section className="content">
              <Outlet />
            </section>
        </div>
      </div>
    )
  }

export default Layout
