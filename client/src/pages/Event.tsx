import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { EventContext } from "../App";
import { DateList } from "../components/ui/DateList";
import { ListRender } from "../components/ui/ListRender";
import bcrypt from "bcrypt";

import "../assets/style/event.scss";
import "../assets/style/table.scss";

interface AuthResponse {
  auth: boolean,
  password: string
}

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

const Event: React.FC = () => {
  const { stateEdit, dispatch } = useContext(EventContext);
  const [ password, setPassword ] = useState("");
  const [ authenticated, setAuthenticated ] = useState(false);
  const { event } = useParams<any>();

  useEffect(() => {
    axios.get(`/api/v1/events/${event}`)
    .then(res => {
      const data = res.data;
      dispatch({
        type: "checkEvent",
        payload: {
          title:       data.title,
          description: htmlSpecialChars(data.description),
          startDate:   data.startDate,
          endDate:     data.endDate,
          password:    data.password,
          user:        data.user,
          decisionDate: {
            judge: data.decisionDate.judge,
            date: data.decisionDate.date
          }
        }
      });
    });

    if(!localStorage.getItem(event)) return;
    const localPassword = localStorage.getItem(event);
    if(typeof(localPassword) !== "string") return;
    axios.post(`/api/v1/check_hash/${event}`,
      { password: localPassword }
    ).then(res => {
      if(res.data.auth) {
        setPassword(localPassword);
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });
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
      localStorage.setItem(event, res.data.password);
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
  } else if( stateEdit !== null && stateEdit.decisionDate.judge == true) {
    return (
      <div className="container">
        <div className="decision-title">{ stateEdit.title }</div>
        <div className="decision-content">
          このイベントの開催日時は{ stateEdit.decisionDate.date }に決定しました！
        </div>
      </div>
    )
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
          {
            stateEdit.description.split("<br />").map((row: string) => {
              return (<p>{row}</p>);
            })
          }
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
