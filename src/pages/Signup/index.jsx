import React, { Component } from "react";
import "./signup.css";

import Logo from "../../assets/images/logolight.png";
import PointsImg from "../../assets/images/points.svg";
import Corner from "../../assets/images/corner.png";
import Arrow from "../../assets/images/backarrow.svg";
import GoogleIcon from "../../assets/images/googleIcon.svg";

import BoxWithBgImg from "../../components/BoxWithBgImg";
import Container from "../../components/container";
import { Body, H2 } from "../../components/Typography";
import Input from "../../components/Input";
import Button from "../../components/Button";
import OrLine from "../../components/OrLine";
import StrengthPassword from "../../components/StrengthPassword";

import Swal from "sweetalert2";
import signupSchema from "../../validation/signupValidation";
import { Link } from "react-router-dom";

export default class Signup extends Component {
  state = {
    email: "",
    password: "",
    password2: "",
    agree: true,
    strength: "nothing",
  };

  returnValue = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value });

    if (id === "password" && value !== "") {
      this.handelStrength(value);
    } else {
      this.setState({
        strength: "nothing",
      });
    }
  };

  handelCheckbox = (e) => {
    const { checked } = e.target;
    this.setState({ agree: checked });
  };

  handelStrength = (password) => {
    let capitals = /[A-Z]/,
      smalls = /[a-z]/,
      nums = /[0-9]/;
    if (password.length < 8) {
      return this.setState({ strength: "weak" });
    } else if (
      smalls.test(password) &&
      nums.test(password) &&
      capitals.test(password)
    ) {
      this.setState({
        strength: "strong",
      });
    } else if (smalls.test(password) && nums.test(password)) {
      this.setState({
        strength: "medium",
      });
    } else if (capitals.test(password) && nums.test(password)) {
      this.setState({
        strength: "medium",
      });
    } else if (capitals.test(password) && smalls.test(password)) {
      this.setState({
        strength: "medium",
      });
    } else if (capitals.test(password)) {
      this.setState({
        strength: "weak",
      });
    } else if (smalls.test(password)) {
      this.setState({
        strength: "weak",
      });
    } else if (nums.test(password)) {
      this.setState({
        strength: "weak",
      });
    }
  };

  sendData = (e) => {
    e.preventDefault();

    signupSchema
      .validate({
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2,
        agree: this.state.agree,
      })
      .then((isValid) => {
        if (isValid)
          Swal.fire({
            title: "Signup Success",
            text: "Your account has been successfully created",
            type: "success",
            icon: "success",
            timer: 1500,
          });

        setTimeout(() => {
          this.props.changePage("login");
        }, 1500);
      })
      .catch((err) => {
        Swal.fire({
          title: "Signup field",
          text: `${err.message}`,
          type: "error",
          icon: "error",
          timer: 3000,
        });
      });
  };

  render() {
    return (
      <div className="signup_page">
        <BoxWithBgImg>
          <img src={Logo} alt="logo" />
          <img src={PointsImg} alt="points group" className="points_img" />
          <p className="quts_mark">“</p>
          <p className="quts_text">
            I always observe the people who pass by when I ride an escalator.
            I'll never see most of them again, so I imagine a lot of things
            about their lives... about the day ahead of them.
          </p>
          <h5 className="author">Hideo Kojima</h5>
          <div className="corner_container">
            <img src={Corner} alt="corner" />
          </div>
        </BoxWithBgImg>

        <div className="content_box">
          <Link
            to='/login'
            className="back_btn"
          >
            <button>
              <img src={Arrow} alt="arrow" /> Back
            </button>
          </Link>
          <Container>
            <H2 text="Register Individual Account!" />
            <Body text="For the purpose of gamers regulation, your details are required." />
            <hr style={{ border: "1px solid #F5F5F5", margin: "16px 0" }} />
            <form onSubmit={this.sendData}>
              <Input
                label="Email address*"
                value={this.state.email}
                id="email"
                type="email"
                placeholder="Enter email address"
                returnValue={this.returnValue}
              />
              <Input
                label="Create password*"
                value={this.state.password}
                id="password"
                type="password"
                placeholder="Password"
                returnValue={this.returnValue}
              />
              <StrengthPassword strength={this.state.strength} />
              <Input
                label="Repeat password*"
                value={this.state.password2}
                id="password2"
                type="password"
                placeholder="Repeat password"
                returnValue={this.returnValue}
              />
              <div className="checkbox_container">
                <input
                  type="checkbox"
                  id="agree"
                  value={this.state.agree}
                  name="agree"
                  checked={this.state.agree}
                  onChange={this.handelCheckbox}
                />
                <label htmlFor="agree" className="agree_label">
                  I agree to terms & conditions
                </label>
              </div>
              <Button text="Register Account" classes="btn btn-primary" />
              <OrLine />
              <Button text="login" classes="btn shadow" icon={GoogleIcon} />
            </form>
          </Container>
        </div>
      </div>
    );
  }
}
