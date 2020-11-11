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

const PastEvents: React.FC = () => {
  let [event_array, set_event_array] = useState<Event[]>([]);
  useEffect(() => {
    let res_array: Event[] = [];
    Object.keys(localStorage).forEach((key, index) => {
        axios.get(`/api/v1/events/${key}`)
        .then(res => {
          if(res.data !== "No data") {
            const event_data: Event = res.data;
            res_array.push(event_data);
          }
          if(index === Object.keys(localStorage).length - 1) {
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
