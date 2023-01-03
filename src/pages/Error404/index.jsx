import React, { Component } from 'react'
import './error404.css'

import { H1, H2 } from '../../components/Typography'
import { Link } from 'react-router-dom'

export default class Error404 extends Component {
  render() {
    return (
      <div className='page_404'>
        <H1 text="Error 404" />
        <H2 text="Page Not Found" />
        <Link to='/' className='btn btn-primary'>back home</Link>
      </div>
    )
  }
}
