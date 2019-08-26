import React, { Component } from "react";
import styles from "./Day.module.css";

class Day extends Component {
  state = {
    day: this.props.day,
    date: this.props.date
  };

  selectDay = () => {
    this.props.selectDay(this.state.date);
  };

  render() {   
    return (
        <td className={this.props.dayStyle ? styles.SelectedDay : styles.Day} onClick={this.selectDay}>
          <span>{this.props.day}</span>
        </td>
    );
  }
}

export default Day;
