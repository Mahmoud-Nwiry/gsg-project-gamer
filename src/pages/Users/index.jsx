import React, { Component } from "react";
import './users.css'

import { Link, Navigate } from "react-router-dom";
import { H2 } from "../../components/Typography";

import axios from "axios";

export default class Users extends Component {
  state = {
    isAuth: true,
    isAdmin: true,
    user: {},
    users: [],
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });

    const user = JSON.parse(localStorage.getItem("gamerUser"));
    if (!user) {
      this.setState({ isAuth: false });
    } else {
      this.setState({ user, isAdmin: user.isAdmin });
      if (user.isAdmin) {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/users`,
            { headers: { "Authorization": `Bearer ${user.token}` } }
          );

          this.setState({ users : res.data})
        } catch (err) {
            console.log(err);
        }
      }
    }
  }

  render() {
    return (
      <div>
        {!this.state.isAuth ? <Navigate to="/login" /> : ""}
        {!this.state.isAdmin ? <Navigate to="/dashboard" /> : ""}

        <H2 text="Users" />

        <section className="users__list">
            {
                this.state.users.map(item => (
                    <ul className="user_info" key={item._id}>
                        {/* <li>ID : <span>{item._id}</span></li> */}
                        <li>Name : <span>{item.name}</span></li>
                        <li>Email : <span>{item.email}</span></li>
                        <li>Roles : <span>{item.isAdmin ? 'Admin' : 'User'}</span></li>
                        {/* <li>Password : <span>{item.password}</span></li>
                        <li>Created : <span>{new Date(item.createdAt).toLocaleString()}</span></li>
                        <li>Updated : <span>{new Date(item.updatedAt).toLocaleString()}</span></li> */}
                        <li className="control">
                          <Link className="view" to={`/dashboard/users/${item._id}`}>View</Link>
                          <Link className="delete" style={{color : 'red'}}>Delete</Link>
                        </li>
                    </ul>
                ))
            }
        </section>

      </div>
    );
  }
}