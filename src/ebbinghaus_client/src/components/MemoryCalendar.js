import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment-timezone";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { useState, useEffect } from "react";

const localizer = momentLocalizer(moment);

function MemoryCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/memory/")
      .then((response) => {
        const formattedEvents = [];
        response.data.forEach((memory) => {
          memory.review_dates.forEach((reviewDateObj) => {
            formattedEvents.push({
              title: memory.title,
              start: new Date(
                moment(reviewDateObj.date).tz("America/Los_Angeles").toDate()
              ),
              end: new Date(
                moment(reviewDateObj.date).tz("America/Los_Angeles").toDate()
              ),
              color: memory.title === "Special Event" ? "blue" : "#85754d",
            });
          });
        });

        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error("There was an error fetching the memories:", error);
      });
  }, []);

  return (
    <div>
      <h1>Review Calendar</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.color,
          },
        })}
      />
    </div>
  );
}

export default MemoryCalendar;
