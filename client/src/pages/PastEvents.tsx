import React, { useState, useEffect } from "react";
import axios from "axios";

import "../assets/style/past.scss";

const PastEvents: React.FC = () => {
  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = () => {
    let event_array = [];

    Object.keys(localStorage).forEach((key) => {
      if(key.match(/event*/)) {
        axios.get(`/api/v1/events/${key}`)
        .then(res => {
          event_array.push(res.data);
        });
      }
    });
  };

  return (
    <div className="past-container">
    </div>
  )
};

export {
  PastEvents
};
