import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Event: React.FC = () => {
  const { event } = useParams();
  const [eventData, setEventData] = useState<any | null>(null);
  // 5ec3942cc612ba0031ddad14
  
  useEffect(() => {
    axios.get(`/api/v1/events/${event}`)
      .then((result: any) => {
        console.log(result)
        setEventData(result.data.title);
      });
  });

  return (
    <div className="container">
      <div>path : {event}</div>
      <div>event title : {eventData}</div>
    </div>
  )
};

export default Event;