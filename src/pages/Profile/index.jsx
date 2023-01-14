import axios from "axios";
import React, { Component } from "react";
import { H2 } from "../../components/Typography";

import './profile.css'

export default class Profile extends Component {
  state = {
    user: {},
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const token = JSON.parse(localStorage.getItem('gamerUser')).token;

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      this.setState({user : res.data});

    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <div className="profile">
        <H2 text="My Profile" />
        {
          this.state.isLoading || (<InfoList user={this.state.user} />)
        }
      </div>
    );
  }
}

class InfoList extends Component {
  render () {
    return (
      <ul className="info">
            <li>ID : <span>{this.props.user._id}</span></li>
            <li>Name : <span>{this.props.user.name}</span></li>
            <li>Email : <span>{this.props.user.email}</span></li>
            <li>Roles : <span>{this.props.user.isAdmin ? 'Admin' : 'User'}</span></li>
        </ul>
    )
  }
}