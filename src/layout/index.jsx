import React, { Component } from 'react'
import './layout.css'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

import Image from '../assets/images/pirsonal.png'

export default class index extends Component {
  render() {
    return (
      <div className='layout'>
        <Sidebar />
        <div className="right_side">
            <Navbar firstName={'mahmoud'} image={Image}  />
            <section className="content">
              {this.props.children}
            </section>
        </div>
      </div>
    )
  }
}
