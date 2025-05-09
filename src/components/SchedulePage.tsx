'use client';

import { useState, useMemo, useEffect } from 'react';
import { CaretLeftFill, CaretRightFill } from 'react-bootstrap-icons';
import { addMonths, subMonths } from 'date-fns';
import { Container } from 'react-bootstrap';

function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<{ year: number; month: number; day: number } | null>(null);
  const sampleEvents = {
    '2025-4-24': [
      { name: 'Todd', exercises: ['Bicep Curls', 'Bench Press'] },
      { name: 'Ben', exercises: ['Lat Pulldowns', 'Leg Curls'] },
      { name: 'Emily', exercises: ['Cardio', 'Calf Raises'] },
    ],
    '2025-4-25': [
      { name: 'Edward', exercises: ['Bicep Curls', 'Bench Press'] },
      { name: 'Megan', exercises: ['Lat Pulldowns', 'Leg Curls'] },
      { name: 'Quincy', exercises: ['Cardio', 'Calf Raises'] },
    ],
    '2025-4-27': [
      { name: 'Kennedy', exercises: ['Bicep Curls', 'Bench Press'] },
      { name: 'Ben', exercises: ['Lat Pulldowns', 'Leg Curls'] },
      { name: 'Alice', exercises: ['Cardio', 'Calf Raises'] },
    ],
    '2025-4-28': [
      { name: 'Liam', exercises: ['Bicep Curls', 'Bench Press'] },
      { name: 'George', exercises: ['Lat Pulldowns', 'Leg Curls'] },
      { name: 'Emily', exercises: ['Cardio', 'Calf Raises'] },
    ],
  };
  const [events, setEvents] = useState<Record<string,
  { name: string; exercises: string[] }[]>>(sampleEvents);
  // const [newEvent, setNewEvent] = useState('');
  useEffect(() => {
    const sampleEvent = {
      '2025-4-24': [
        { name: 'Todd', exercises: ['Bicep Curls', 'Bench Press'] },
        { name: 'Ben', exercises: ['Lat Pulldowns', 'Leg Curls'] },
        { name: 'Emily', exercises: ['Cardio', 'Calf Raises'] },
      ],
      '2025-4-25': [
        { name: 'Edward', exercises: ['Bicep Curls', 'Bench Press'] },
        { name: 'Megan', exercises: ['Lat Pulldowns', 'Leg Curls'] },
        { name: 'Quincy', exercises: ['Cardio', 'Calf Raises'] },
      ],
      '2025-4-27': [
        { name: 'Kennedy', exercises: ['Bicep Curls', 'Bench Press'] },
        { name: 'Ben', exercises: ['Lat Pulldowns', 'Leg Curls'] },
        { name: 'Alice', exercises: ['Cardio', 'Calf Raises'] },
      ],
      '2025-4-28': [
        { name: 'Liam', exercises: ['Bicep Curls', 'Bench Press'] },
        { name: 'George', exercises: ['Lat Pulldowns', 'Leg Curls'] },
        { name: 'Emily', exercises: ['Cardio', 'Calf Raises'] },
      ],
    };
    setEvents(sampleEvent);
  }, []);

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
    const calendarDays: { day: number; isCurrentMonth: boolean; isNextMonth: boolean }[] = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      calendarDays.push({
        day: oldDays - i,
        isCurrentMonth: false,
        isNextMonth: false,
      });
    }

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
    // Month and year display + the buttons to change the month
    <Container className="schedule-container">
      <h2 className="my-text mt-6 mb-4">
        {months[currentDate.getMonth()]}
        {' '}
        {currentDate.getFullYear()}
      </h2>
      <button className="calendar-button" type="button" onClick={prevMonth}><CaretLeftFill /></button>
      <button type="button" onClick={nextMonth}><CaretRightFill /></button>
      <div className="calendar-schedule">
        <div className="calendar-mini-container">
          <div className="calendar-section">
            <div className="grid-container">
              {calendar.map((item) => {
                let monthType = 'prev';
                if (item.isCurrentMonth) {
                  monthType = 'curr';
                } else if (item.isNextMonth) {
                  monthType = 'next';
                }
                const key = `${year}-${month}-${monthType}-${item.day}`;
                return (
                  <button
                    key={key}
                    type="button"
                    className={`grid-item ${
                      (() => {
                        if (item.isCurrentMonth) return 'current-month';
                        if (item.isNextMonth) return 'next-month';
                        return 'prev-month';
                      })()
                    } ${selectedDate?.day === item.day && item.isCurrentMonth ? 'selected' : ''}`}
                    onClick={() => {
                      if (item.isCurrentMonth) {
                        setSelectedDate({ year, month, day: item.day });
                      }
                    }}
                  >
                    {item.day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {/* Box containing schedules */}
        <div className="box">
          <h2>Schedules</h2>
          {selectedDate ? (
            <>
              <h5>
                {months[selectedDate.month]}
                {' '}
                {selectedDate.day}
                ,
                {' '}
                {selectedDate.year}
              </h5>
              <ul className="mt-3">
                {(events[`${selectedDate.year}-${selectedDate.month + 1}-${selectedDate.day}`] || []).map(
                  (event) => (
                    <li key={`${selectedDate.year}-${selectedDate.month + 1}-${selectedDate.day}-${event.name}`}>
                      <strong>{event.name}</strong>
                      <ul>
                        {event.exercises.map((exercise) => (
                          <li key={exercise}>{exercise}</li>
                        ))}
                      </ul>
                    </li>
                  ),
                )}
              </ul>
            </>
          ) : (
            <p>Select a date to view schedules.</p>
          )}
        </div>
      </div>
    </Container>
  );
}

export default SchedulePage;
