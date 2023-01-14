import React, { Component } from "react";
import "./login.css";

import Logo from "../../assets/images/logoblue.png";
import Gear from "../../assets/images/gear.png";

import Container from "../../components/container";
import { Body, H1 } from "../../components/Typography";
import IconButton from "../../components/IconButton";

import GoogleIcon from "../../assets/images/google_icon.png";
import TwitterIcon from "../../assets/images/twitter_icon.png";
import LinlkedinIcon from "../../assets/images/linkedin_icon.png";
import GithubIcon from "../../assets/images/github_icon.png";
import OrLine from "../../components/OrLine";

import Input from "../../components/Input";
import Button from "../../components/Button";

import Swal from "sweetalert2";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const icons = [
  {
    id: 1,
    src: GoogleIcon,
    alt: "google icon",
    link: "#",
  },
  {
    id: 2,
    src: TwitterIcon,
    alt: "twitter icon",
    link: "#",
  },
  {
    id: 3,
    src: LinlkedinIcon,
    alt: "linkedin icon",
    link: "#",
  },
  {
    id: 4,
    src: GithubIcon,
    alt: "github icon",
    link: "#",
  },
];

class Login extends Component {
  state = {
    email: "",
    password: "",
    isLogingIn: false,
    isLoading: false,
    userId : null
  };

  handelEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handelPassword = (e) => {
    this.setState({ password: e.target.value });
  };

  sendData = async (e) => {
    e.preventDefault();

    this.setState({ isLoading: true });

    try{
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        { email: this.state.email, password: this.state.password }
      );
      
      localStorage.setItem('gamerUser', JSON.stringify(res.data));
      this.props.login(res.data);
      this.setState({isLogingIn: true, userId : res.data._id });

    }
    catch (e) {
      console.log(e);
    }
    finally {
      this.setState({isLoading: false})
    }

  };

  render() {
    return (
      <div className="login_page">
        <div className="login_left">
          <img src={Logo} className="logo" alt="logo" />
          <p className="quts_mark">“</p>
          <p className="quts_text">
            I always observe the people who pass by when I ride an escalator.
            I'll never see most of them again, so I imagine a lot of things
            about their lives... about the day ahead of them.
          </p>
          <h5 className="author">Hideo Kojima</h5>
          <img src={Gear} alt="gear" className="gear_img" />
        </div>

        <div className="login_right">
          <Container>
            <div className="titles">
              <H1 text="Join the game!" />
              <Body text="Go inside the best gamers social network!" />
            </div>

            <div className="icons_box">
              <div className="line"></div>
              {icons.map((item) => (
                <IconButton
                  icon={item.src}
                  alt={item.alt}
                  link={item.link}
                  key={item.id}
                />
              ))}
            </div>
            <OrLine />
            <form onSubmit={this.sendData}>
              <Input
                label="Your Email"
                value={this.state.email}
                type="email"
                id="email"
                placeholder="Write your email"
                returnValue={this.handelEmail}
              />
              <Input
                label="Enter your password"
                value={this.state.password}
                type="password"
                id="password"
                placeholder="•••••••••"
                returnValue={this.handelPassword}
              />
              <Button
                text={this.state.isLoading ? "Loading ..." : "Login"}
                classes={`btn btn-primary mt ${
                  this.state.isLoading ? "loading" : ""
                }`}
              />
              <p className="create_account">
                Don’t have an account? <Link to="/signup">Register</Link>
              </p>
            </form>
          </Container>
        </div>
        {this.state.isLogingIn ? <Navigate to={`/dashboard`} /> : ''}
      </div>
    );
  }
}

export default Login;
