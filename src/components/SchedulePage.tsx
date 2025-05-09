/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/button-has-type */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { CaretLeftFill, CaretRightFill } from 'react-bootstrap-icons';
import { addMonths, subMonths } from 'date-fns';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';

type ScheduleEntry = {
  id: string;
  date: string; // ISO string
  exercise: string;
};

export default function SchedulePage(): JSX.Element {
  const { data: session, status } = useSession();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<{
    year: number;
    month: number;
    day: number;
  } | null>(null);

  // Map "YYYY-M-D" -> array of exercises
  const [events, setEvents] = useState<Record<string, string[]>>({});

  // Load existing entries once authenticated
  useEffect(() => {
    if (status !== 'authenticated') return;
    (async () => {
      try {
        const res = await fetch('/api/schedule');
        if (!res.ok) throw new Error('Failed to fetch schedules');
        const data: ScheduleEntry[] = await res.json();

        const grouped: Record<string, string[]> = {};
        data.forEach((entry) => {
          const d = new Date(entry.date);
          const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
          grouped[key] = grouped[key] || [];
          if (!grouped[key].includes(entry.exercise)) {
            grouped[key].push(entry.exercise);
          }
        });

        setEvents(grouped);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [status]);

  // Generate calendar grid
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const calendar = useMemo(() => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const days: { day: number; isCurrent: boolean }[] = [];

    // previous-month tail
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, isCurrent: false });
    }
    // this month
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({ day: d, isCurrent: true });
    }
    // fill to 35 cells
    while (days.length < 35) {
      days.push({ day: days.length - (firstDay + daysInMonth) + 1, isCurrent: false });
    }
    return days;
  }, [year, month]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  // Toggle add/remove exercise without mutating any existing array
  const toggleExercise = async (exercise: string) => {
    if (!selectedDate) return;
    const { year, month, day } = selectedDate;
    const jsDate = new Date(year, month, day);
    const iso = jsDate.toISOString();
    const key = `${year}-${month + 1}-${day}`;

    // Does today already have this exercise?
    const listForDay = events[key] || [];
    const already = listForDay.includes(exercise);

    try {
      const res = await fetch('/api/schedule', {
        method: already ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: iso, exercise }),
      });
      if (!res.ok) throw new Error();

      setEvents((prev) => {
        // copy top-level
        const updated: Record<string, string[]> = { ...prev };
        // make a fresh array
        if (already) {
          updated[key] = listForDay.filter((e) => e !== exercise);
        } else {
          updated[key] = [...listForDay, exercise];
        }
        return updated;
      });
    } catch (err) {
      console.error(err);
      alert(`Could not ${already ? 'remove' : 'add'} ${exercise}. Try again.`);
    }
  };

  // While session is resolving
  if (status === 'loading') {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: '60vh' }}
      >
        <Spinner animation="border" />
      </Container>
    );
  }
  // Not signed in
  if (status !== 'authenticated') {
    return (
      <Container className="mt-5 text-center">
        <p>
          Please
          {' '}
          <a href="/auth/signin">sign in</a>
          {' '}
          to manage your schedule.
        </p>
      </Container>
    );
  }

  return (
    <Container className="schedule-container">
      <h2 className="mt-5 mb-3">
        {months[month]}
        {' '}
        {year}
      </h2>

      <div className="mb-4">
        <Button variant="outline-primary" onClick={prevMonth} className="me-2">
          <CaretLeftFill />
        </Button>
        <Button variant="outline-primary" onClick={nextMonth}>
          <CaretRightFill />
        </Button>
      </div>

      <Row>
        {/* Calendar */}
        <Col xs={12} md={8} style={{ overflowX: 'auto' }}>
          <div
            className="grid-container"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, minmax(0,1fr))',
              gap: '4px',
              width: '100%',
            }}
          >
            {calendar.map((item, idx) => {
              const key = `${year}-${month}-${idx}-${item.day}`;
              const isSelected = selectedDate?.day === item.day && item.isCurrent;
              return (
                <button
                  key={key}
                  className={`grid-item ${
                    item.isCurrent ? 'current-month' : 'out-month'
                  } ${isSelected ? 'selected' : ''}`}
                  style={{ width: '100%', padding: '8px 0' }}
                  onClick={() => item.isCurrent
                    && setSelectedDate({ year, month, day: item.day })}
                >
                  {item.day}
                </button>
              );
            })}
          </div>
        </Col>

        {/* Side Box */}
        <Col xs={12} md={4} className="mt-4 mt-md-0">
          <div className="p-3 border rounded" style={{ width: '100%' }}>
            <h4>Schedule</h4>
            {selectedDate ? (
              <>
                <p>
                  <strong>
                    {months[selectedDate.month]}
                    {' '}
                    {selectedDate.day}
                    ,
                    {' '}
                    {selectedDate.year}
                  </strong>
                </p>

                <div className="d-flex flex-wrap gap-2 mb-3">
                  {['Arms', 'Legs', 'Back', 'Chest', 'Cardio'].map((ex) => {
                    const key = `${selectedDate.year}-${
                      selectedDate.month + 1
                    }-${selectedDate.day}`;
                    const active = events[key]?.includes(ex);
                    return (
                      <Button
                        key={ex}
                        size="sm"
                        variant={active ? 'danger' : 'outline-primary'}
                        onClick={() => toggleExercise(ex)}
                      >
                        {active ? `– ${ex}` : `+ ${ex}`}
                      </Button>
                    );
                  })}
                </div>

                <ul className="list-unstyled">
                  {(events[
                    `${selectedDate.year}-${selectedDate.month + 1}-${selectedDate.day}`
                  ] || []).map((ex) => (
                    <li key={ex}>
                      •
                      {ex}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p>Select a date to add or remove exercises.</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
