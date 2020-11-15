import React, { useState, useEffect } from "react";
import axios from "axios";
import { EventCard } from "../components/ui/EventCard";

import "../assets/style/past.scss";

interface Event {
  title: string
  description: string
  startDate: string
  endDate: string
  password: string
  check: string
  user: Array<User>
  decisionDate: {
    judge: boolean
    dete: string
  }
}

interface User {}

const htmlSpecialChars = (str: string) => {
  const modified_str = str.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\r?\n/g, '<br />')
  return modified_str;
};

const compare = (a: Event, b: Event) => {
  const a_date = new Date(a.startDate);
  const b_date = new Date(b.startDate);

  if(a_date > b_date) {
    return -1;
  } else {
    return 1;
  }
};

const PastEvents: React.FC = () => {
  let [event_array, set_event_array] = useState<Event[]>([]);
  useEffect(() => {
    let res_array: Event[] = [];
    Object.keys(localStorage).forEach((key, index) => {
        axios.get(`/api/v1/events/${key}`)
        .then(res => {
          if(res.data !== "No data") {
            const event_data: Event = res.data;
            event_data.description = htmlSpecialChars(event_data.description);
            event_data.title = htmlSpecialChars(event_data.title);
            res_array.push(event_data);
          }
          if(index === Object.keys(localStorage).length - 1) {
            res_array.sort(compare);
            set_event_array(res_array);
          }
        });
    });
  }, []);
  return (
    <div className="past-container">
      {
        event_array.map((event) => {
          return (<EventCard data={event} />)
        })
      }
    </div>
  )
};

export {
  PastEvents
};
