import React, { Component } from 'react';
import classnames from 'classnames';
import {
  monthNames,
  weekDays,
  getDays,
  isPickedDate
} from './sources';
import { Button } from '@material-ui/core';
import Styles, { StyledMainContainer } from './Styles';
import GlobalStyles from '../../GlobalStyles';
import protector from '../../HOC/Protector';
import connect from './connect';

class Calendar extends Component {
  constructor() {
    super();
    const date = new Date();

    this.state = {
      currentMoth: date.getMonth(),
      currentYear: date.getFullYear(),

      pickedDay: {
        date: date.getDate(),
        weekDay: date.getDay(),
        month: date.getMonth(),
        year: date.getFullYear()
      },
      prevMonthDays: [],
      days: [],
      nextMonthDays: [],
      locale: 'EU'
    };
  }

  componentDidMount() {
    const { userData, getCurrentMonthEvents } = this.props
    const { currentMoth, currentYear } = this.state
    this.setDates();
    getCurrentMonthEvents(userData.uid, `${currentYear}-${currentMoth.toString().padStart(2, 0)}`);
  }

  setDates = () => {
    const {
      currentMoth,
      currentYear
    } = this.state;

    const prevMonth = new Date(
      currentMoth !== 0 ? currentYear : currentYear - 1,
      currentMoth !== 0 ? currentMoth - 1 : 11
    );
    const nextMonth = new Date(
      currentMoth !== 11 ? currentYear : currentYear + 1,
      currentMoth !== 11 ? currentMoth + 1 : 0
    );

    this.setState({
      prevMonthDays: getDays(
        prevMonth.getMonth(),
        prevMonth.getFullYear()
      ),
      days: getDays(
        currentMoth,
        currentYear,
      ),
      nextMonthDays: getDays(
        nextMonth.getMonth(),
        nextMonth.getFullYear()
      )
    });
  }

  setPickedDay = (pickedDay) => {
    this.setState({
      pickedDay,
      currentMoth: pickedDay.month,
      currentYear: pickedDay.year
    }, this.setDates);
  }

  prevMonth = () => {
    if (this.state.currentMoth === 0) {
      this.setState({
        currentMoth: 11,
        currentYear: this.state.currentYear - 1
      }, this.setDates);
    }
    else {
      this.setState({
        currentMoth: this.state.currentMoth - 1
      }, this.setDates);
    }
  }

  nextMonth = () => {
    if (this.state.currentMoth === 11) {
      this.setState({
        currentMoth: 0,
        currentYear: this.state.currentYear + 1
      }, this.setDates);
    }
    else {
      this.setState({
        currentMoth: this.state.currentMoth + 1
      }, this.setDates);
    }
  }

  setYear = (currentYear) => {
    this.setState({ currentYear }, this.setDates);
  }

  getPageDates = () => {
    const {
      prevMonthDays,
      days,
      nextMonthDays,
      locale
    } = this.state;

    if (!days.length) { return []; }

    let allDays = [];

    let firstDay = days[0].weekDay;
    if (locale === 'RU') {
      firstDay = firstDay !== 0 ? firstDay - 1 : 6;
    }
    if (firstDay !== 0) {
      allDays = [...prevMonthDays.slice(firstDay * -1)];
    }

    allDays = [...allDays, ...days];

    let lastDay = days[days.length - 1].weekDay;
    if (locale === 'RU') {
      lastDay = lastDay !== 0 ? lastDay - 1 : 6;
    }
    if (lastDay !== 6) {
      allDays = [...allDays, ...nextMonthDays.slice(0, 6 - lastDay)];
    }
    return allDays;
  }

  goToDayShedule = () => {
    const { pickedDay } = this.state;
    this.props.history.push(`/calendar/shedule/${pickedDay.year}-${pickedDay.month.toString().padStart(2, 0)}-${pickedDay.date.toString().padStart(2, 0)}`);
  }

  handleButtonPress = (day) => {
    this.setPickedDay(day);
    this.buttonPressTimer = setTimeout(() => this.goToDayShedule(), 1000);
  }

  handleButtonRelease = () => {
    clearTimeout(this.buttonPressTimer);
  }

  render() {
    const {
      currentMoth,
      currentYear,
      pickedDay,
      locale
    } = this.state;
    const { currentMonthEvents } = this.props;

    return (
      <StyledMainContainer>
        <Styles>
          <div className="locales">
            <Button color="primary" variant="contained" onClick={() => this.setState({ locale: 'EU' })}>
              EU
            </Button>

            <Button color="secondary" variant="contained" onClick={() => this.setState({ locale: 'RU' })}>
              RU
            </Button>
          </div>
          <div className="years-container">
            <Button
              onClick={() => { this.setYear(currentYear - 1) }}
            >
              {'<'}
            </Button>
            <p>{currentYear}</p>
            <Button
              onClick={() => { this.setYear(currentYear + 1) }}
            >
              >
          </Button>
          </div>

          <div className="month-container">
            <Button
              onClick={this.prevMonth}
            >
              {'<'}
            </Button>
            <p>{monthNames[locale][currentMoth]}</p>
            <Button
              onClick={this.nextMonth}
            >
              >
          </Button>
          </div>

          <div className="week-days">
            {
              (locale === 'EU' ? weekDays[locale] : [...weekDays[locale].slice(1), weekDays[locale][0]]).map((weekDayName, index) => (
                <p
                  key={index}
                  className={(locale === 'EU' ? (index === 0 || index === 6) : (index === 5 || index === 6)) ? 'weekend' : ''}
                >
                  {weekDayName}
                </p>
              ))
            }
          </div>

          <div className="days">
            {
              this.getPageDates().map(day => (
                <p
                  onTouchStart={() => this.handleButtonPress(day)} 
                  onTouchEnd={this.handleButtonRelease} 
                  onClick={() => this.setPickedDay(day)}
                  onDoubleClick={this.goToDayShedule}
                  className={classnames({
                    'today': isPickedDate(day),
                    'picked-day': isPickedDate(day, pickedDay) && day.month === currentMoth,
                    'picked-month': day.month === currentMoth
                  })}
                >
                  {(currentMonthEvents && typeof currentMonthEvents[`${day.year}-${day.month.toString().padStart(2, 0)}-${day.date.toString().padStart(2, 0)}`] !== 'undefined') && (
                    <div className="dot" />
                  )}
                  {day.date}
                </p>
              ))
            }
          </div>
        </Styles>

        <GlobalStyles />
      </StyledMainContainer>
    );
  }
}

export default protector.ForLogin(connect(Calendar));

