import React, { Component } from 'react'
import './navbar.css'

export default class index extends Component {
  render() {
    return (
      <nav>
        <div className="text">
            <p>Welcome back,<br />{this.props.firstName}!</p>
        </div>
        <div className="image">
            <img src={this.props.image} alt="your pic" />
        </div>
      </nav>
    )
  }
}
