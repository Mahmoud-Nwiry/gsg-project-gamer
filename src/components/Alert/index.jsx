import React, { Component } from "react";
import "./alert.css";

export default class Alert extends Component {
  state = {
    isOpen: this.props.alert.isOpen || false,
  };

  componentDidUpdate(){
    if(this.props.alert.isOpen !== this.state.isOpen)
      this.setState({isOpen: this.props.alert.isOpen})
  }

  render() {
    return (
      <div
        className={`alert ${this.props.alert.classes} ${
          this.state.isOpen ? "visiable" : "hide"
        }`}
      >
        {this.props.alert.type} : {this.props.alert.message} {}
      </div>
    );
  }
}
