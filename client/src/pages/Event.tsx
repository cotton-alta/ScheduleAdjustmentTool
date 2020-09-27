import React, { useState, useEffect, useContext, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { EventContext } from "../App";
import { DateList } from "../components/ui/DateList";
import { ListRender } from "../components/ui/ListRender";

import "../assets/style/event.scss";
import "../assets/style/table.scss";

interface AuthResponse {
  auth: boolean
}

interface Event {
  title: string
  description: string
  startDate: string
  endDate: string
  password: string
  check: string
  user: Array<User>
}

interface User {}

const Event: React.FC = () => {
  const { stateEdit, dispatch } = useContext(EventContext);
  const [ password, setPassword ] = useState("");
  const [ authenticated, setAuthenticated ] = useState(false);
  const [ eventData, setEventData ] = useState<Event | null>(null);
  const { event } = useParams<any>();

  useEffect(() => {
    axios.get(`/api/v1/events/${event}`)
    .then(res => {
      const data = res.data;
      setEventData(data.title);
      dispatch({
        type: "checkEvent",
        payload: {
          title:       data.title,
          description: data.description,
          startDate:   data.startDate,
          endDate:     data.endDate,
          password:    data.password,
          user:        data.user
        }
      });
    });

    if(!!localStorage.getItem(event)) {
      const localPassword = localStorage.getItem(event);
      if(typeof(localPassword) === "string") {
        setPassword(localPassword);
        setAuthenticated(true);
      }
    }
  }, []);
  
  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  
  const postPassword = () => {
    axios.post<AuthResponse>(`/api/v1/check/${event}`,
      { password: password }
    )
    .then(res => {
      setAuthenticated(res.data.auth);
      localStorage.setItem(event, password);
    });
  };

  if(!authenticated) {
    return (
      <div className="container">
        <div className="event-auth-title">
          イベントパスワード
        </div>
        <div className="event-auth-form">
          <input 
            type="text"
            onChange={changePassword} 
          />
        </div>
        <div 
          className="event-button"
          onClick={postPassword}  
        >
          送信
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="event-title--headline">
          イベント名
        </div>
        <div className="event-title--content">
          {stateEdit.title}
        </div>
        <div className="event-description--headline">
          説明
        </div>
        <div className="event-description--content">
          {stateEdit.description}
        </div>
        <table className="table-wrapper">
          <tbody>
          <tr className="table-tr">
            <th className="none-border"></th>
            <DateList data={stateEdit}/>
          </tr>
          <ListRender stateEdit={stateEdit}/>
          </tbody>
        </table>
        <div className="event-button">
          <Link className="event-link" to={`/join/${event}`}>
            このイベントに参加
          </Link>
        </div>
        <div className="event-host">
          （ホストのみ）
        </div>
        <div className="event-button">
          <Link className="event-link" to={`/decision/${event}`}>
            日程を決定！
          </Link>
        </div>
      </div>
    )
  }
};

export default Event;