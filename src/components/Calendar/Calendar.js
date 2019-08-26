import React, { Component } from "react";
import moment from "moment";
import styles from "./Calendar.module.css";

import Day from "./Day/Day";
import BlankDay from "./Day/BlankDay";
import Modal from "../UI/Modal/Modal";
import DayModal from "./DayModal/DayModal";

class Calendar extends Component {
  state = {
    dateContext: moment(),
    today: moment(),
    dayPopup: false,
    selectedDate: null
  };

  weekdays = moment.weekdays();
  weekdaysShort = moment.weekdaysShort();
  months = moment.months();

  year = () => {
    return this.state.dateContext.format("Y");
  };
  month = () => {
    return this.state.dateContext.format("MM");
  };
  monthText = () => {
    return this.state.dateContext.format("MMMM");
  };
  daysInMonth = () => {
    return this.state.dateContext.daysInMonth();
  };
  currentDate = () => {
    return this.state.dateContext.format("DD/MM/YYYY");
  };
  currentDay = () => {
    return this.state.dateContext.format("DD");
  };
  firstDayOfMonth = () => {
    let dateContext = this.state.dateContext;
    let firstDay = moment(dateContext)
      .startOf("month")
      .format("d");
    return firstDay;
  };

  prevMonth = () => {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).subtract(1, "month");
    this.setState({
      dateContext
    });
    this.props.onPrevMonth && this.props.onPrevMonth();
  };

  nextMonth = () => {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).add(1, "month");
    this.setState({
      dateContext
    });
    this.props.onNextMonth && this.props.onNextMonth();
  };

  daySelector = selectedDate => {
    this.setState({
      dayPopup: true,
      selectedDate
    });
  };

  closeModal = () => {
    this.setState({ dayPopup: false });
  };

  render() {
    let weekdays = this.weekdaysShort.map(day => {
      return (
        <td key={day} className={styles.Weekday}>
          {day}
        </td>
      );
    });

    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(
        <BlankDay key={`blank${i}`} day={""} />
      );
    }

    let daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      const date = `${d}/${this.month()}/${this.year()}`;
      const posts = this.props.allPosts.filter(post => post.date === date);
      const dayStyle = posts.length > 0 ? true : false

      daysInMonth.push(
        <Day key={d} day={d} date={date} selectDay={this.daySelector} dayStyle={dayStyle}/>
      );
    }

    let totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let columns = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        columns.push(row);
      } else {
        let insertRow = columns.slice();
        rows.push(insertRow);
        columns = [];
        columns.push(row);
      }
      if (i === totalSlots.length - 1) {
        let insertRow = columns.slice();
        rows.push(insertRow);
      }
    });

    let days = rows.map((d, i) => {
      return <tr key={i * 100}>{d}</tr>;
    });

    return (
      <div className={styles.CalendarContainer}>
        <Modal show={this.state.dayPopup} closeModal={this.closeModal}>
          <DayModal
            date={this.state.selectedDate}
            allPosts={this.props.allPosts}
            addPost={this.props.addPost}
            removePost={this.props.removePost}
          />
        </Modal>
        <h2>TVF Calendar</h2>
        <table className={styles.Calendar}>
          <thead>
            <tr className={styles.CalendarHeader}>
              <td colSpan="5">
                <span onClick={e => this.prevMonth()}>&#8249;</span>{" "}
                {this.monthText()}{" "}{this.year()}{" "}
                <span onClick={e => this.nextMonth()}>&#8250;</span>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>{weekdays}</tr>
            {days}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Calendar;
