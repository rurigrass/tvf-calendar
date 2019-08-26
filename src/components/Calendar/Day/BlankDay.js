import React, { Component } from "react";
import styles from "./Day.module.css";

class BlankDay extends Component {
  state = {
    day: this.props.day,
    date: this.props.date
  };

  render() {
    return (
      <td className={styles.EmptySlot}>
        <span>{this.props.day}</span>
      </td>
    );
  }
}

export default BlankDay;