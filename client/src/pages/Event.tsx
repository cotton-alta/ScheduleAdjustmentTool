import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Event: React.FC = () => {
  const { event } = useParams();
  const [eventData, setEventData] = useState<any | null>(null);
  
  useEffect(() => {
    axios.get("/")
      .then(result => {
        setEventData(result.data);
      });
  });

  return (
    <div className="container">
      {event}
      {eventData}
    </div>
  )
};

export default Event;