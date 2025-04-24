'use client';

import { useState, useMemo } from 'react';
import { CaretLeftFill, CaretRightFill, ChatLeftDotsFill } from 'react-bootstrap-icons';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { addMonths, subMonths } from 'date-fns';

const { daysInWeek } = require("date-fns/constants");
const { daysInYear } = require("date-fns/constants");
const { maxTime } = require("date-fns/constants");

//   return days;
// };

function SchedulePage() {
  const [rawData, setRawData] = useState('');
  const [formatTime, setFormatTime] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleInputChange = (e) => {
    // allows only numbers
    const input = e.target.value.replace(/\D/g, '');
    setRawData(input);
    if (input.length === 3 || input.length === 4) {
      let hours = input.slice(0, input.length - 2);
      let minutes = input.slice(-2);
      if (hours.length === 1) hours = '0' + hours;
      if (parseInt(hours, 10) < 24 && parseInt(minutes, 10) < 60) {
        setFormatTime(`${hours}:${minutes}`);
      } else {
        setFormatTime('');
      }
    } else {
      setFormatTime('');
    }
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const calendar = useMemo(() => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const oldMonth = new Date(year, month, 0);
    const oldDays = oldMonth.getDate();
    const calendarDays = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      calendarDays.push({
        day: oldDays - i,
        isCurrentMonth: false,
        isNextMonth: false,
      });
    }

    // for (let i = 0; i < firstDay; i++) {
    //   calendarDays.push(null);
    // }
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({
        day: i,
        isCurrentMonth: true,
        isNextMonth: false,
      });
    }
    while (calendarDays.length < 35) {
      calendarDays.push({
        day: calendarDays.length - (firstDay + daysInMonth) + 1,
        isCurrentMonth: false,
        isNextMonth: true,
      });
    }
    return calendarDays;
  }, [year, month]);
  return (
    <div>
      <h2>
        {months[currentDate.getMonth()]}
        {currentDate.getFullYear()}
      </h2>
      <button type="button" onClick={prevMonth}>Previous</button>
      <button type="button" onClick={nextMonth}>Next</button>

      <div style={{ marginTop: '20px' }}>
        <label>Enter time: </label>
        <input
          type="text"
          value={rawData}
          onChange={handleInputChange}
          maxLength={4}
          placeholder="HH:MM"
        />
        {formatTime && (
        <div>
          Formatted Time:
          {formatTime}
        </div>
        )}
      </div>
      <div
        className="grid-container"
      >
        {calendar.map((item) => {
          let monthType = 'prev';
          if (item.isCurrentMonth) {
            monthType = 'curr';
          } else if (item.isNextMonth) {
            monthType = 'next';
          }
          const key = `${year}-${month}-${monthType}-${item.day}`;
          return (
            <div
              key={key}
              className={`grid-item ${
                (() => {
                  if (item.isCurrentMonth) {
                    return 'current-month';
                  }
                  if (item.isNextMonth) {
                    return 'next-month';
                  }
                  return 'prev-month';
                })()
              }`}
            >
              {item.day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SchedulePage;
