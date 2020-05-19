import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Event: React.FC = () => {
  const { event } = useParams();
  //contextで認証状態を確認（とりあえず開発中はtureにしてる）
  const [authenticated, setAuthenticated] = useState(true);
  const [eventData, setEventData] = useState<any | null>(null);

  useEffect(() => {
    axios.get(`/api/v1/events/${event}`)
      .then((result: any) => {
        console.log(result)
        // setEventData(result.data.title);
      });
  });
  if(!authenticated) {
    return (
      <div></div>
    );
  } else {
    return (
      <div className="container">
        <div>path : {event}</div>
        <div>event title : {eventData}</div>
      </div>
    )
  }
};

export default Event;