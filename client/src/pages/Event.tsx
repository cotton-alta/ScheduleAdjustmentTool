import React, { useState, useEffect, useReducer, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Moment from "moment";
import { eventAction } from "../actions/event";

import "../assets/style/event.scss";

const initEvent = {
  title: "sample",
  password: "password",
  description: "説明",
  startDate: "2020/05/31",
  endDate: "2020/06/02"
};

const DateList = (props: any) => {
  const start = Moment(props.data.startDate);
  const end = Moment(props.data.endDate);
  const list = [];
  while(start.format() != end.format()) {
    list.push(<th>{ start.format("YYYY-MM-DD") }</th>);
    start.add('days', 1);
  }
  list.push(<th>{ start.format("YYYY-MM-DD") }</th>);
  return (<Fragment>{ list }</Fragment>);
};

const Event: React.FC = () => {
  const [ stateEdit, dispatch ] = useReducer(eventAction, initEvent);
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
        dispatch({
          type: "checkEvent",
          payload: {
            title: result.data[0].title,
            description: result.data[0].description,
            startDate: result.data[0].startDate,
            endDate: result.data[0].endDate,
            password: result.data[0].password
          }
        });
      });
  }, []);
  
  useEffect(() => {
    console.log(stateEdit);
    console.log(DateList);
  }, [ stateEdit ]);

  if(!authenticated) {
    return (
      <div></div>
    );
  } else {
    return (
      <div className="container">
        <div>path : {event}</div>
        <div>event title : {stateEdit.title}</div>
        <table className="event-table-wrapper">
          <tbody>
          <tr>
            <th>名前</th>
            <DateList data={stateEdit}/>
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
        <div className="event-join-button">
          <Link to={`/join/${event}`}>
            このイベントに参加
          </Link>
        </div>
      </div>
    )
  }
};

export default Event;