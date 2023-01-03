import React, { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";

import users from '../../mock/users'

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

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handelEmail = (e) => {
    setEmail(e.target.value)
  }
  const handelPassword = (e) => {
    setPassword(e.target.value)
  }

  const sendData = (e) => {

    e.preventDefault();

    const user = users.find(user => user.email === email && user.password === password)

    if (user) {
      navigate(`/dashboard/${user.id}`)
    }
    else {
      Swal.fire(
        {
          title : 'Login Failed',
          text: 'Please check your email and password then try again',
          icon: 'error',
          type: 'error',
        }
      )
    }
  };

  return (
    <div className="login_page">
      <div className="login_left">
        <img src={Logo} className="logo" alt="logo" />
        <p className="quts_mark">“</p>
        <p className="quts_text">
          I always observe the people who pass by when I ride an escalator. I'll
          never see most of them again, so I imagine a lot of things about their
          lives... about the day ahead of them.
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
          <form onSubmit={sendData}>
            <Input
              label="Your Email"
              value={email}
              type="email"
              id="email"
              placeholder="Write your email"
              returnValue={handelEmail}
            />
            <Input
              label="Enter your password"
              value={password}
              type="password"
              id="password"
              placeholder="•••••••••"
              returnValue={handelPassword}
            />
            <Button text="Login" classes="btn btn-primary mt" />
            <p className="create_account">
              Don’t have an account? <Link to="/signup">Register</Link>
            </p>
          </form>
        </Container>
      </div>
    </div>
  );
};

export default Login