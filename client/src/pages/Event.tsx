import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "../assets/style/event.scss";

const Event: React.FC = () => {
  const { event } = useParams();
  //contextで認証状態を確認（とりあえず開発中はtureにしてる）
  const [authenticated, setAuthenticated] = useState(true);
  const [eventData, setEventData] = useState<any | null>(null);

  useEffect(() => {
    // 5ef9d12b5606394cf99f404a
    axios.get(`/api/v1/events/${event}`)
      .then((result: any) => {
        console.log(result)
        setEventData(result.data[0].title);
      });
  }, []);
  if(!authenticated) {
    return (
      <div></div>
    );
  } else {
    return (
      <div className="container">
        <div>path : {event}</div>
        <div>event title : {eventData}</div>
        <table className="event-table-wrapper">
          <tbody>
          <tr>
            <th>名前</th>
            <th>6/20</th>
            <th>6/21</th>
            <th>6/22</th>
          </tr>
          <tr>
            <th>Taro</th>
            <td>b</td>
            <td>b</td>
            <td>b</td>
          </tr>
          <tr>
            <th>Sato</th>
            <td>b</td>
            <td>b</td>
            <td>b</td>
          </tr>
          <tr>
            <th>Suzuki</th>
            <td>b</td>
            <td>b</td>
            <td>b</td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
};

export default Event;