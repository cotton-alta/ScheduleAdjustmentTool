import React, { useState, useEffect, useContext, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Moment from "moment";
import { EventContext } from "../App";
import { DateList } from "../components/ui/DateList";
import { UserList } from "../components/ui/UserList";

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

interface User {

}

const Event: React.FC = () => {
  const { stateEdit, dispatch } = useContext(EventContext);
  const [ password, setPassword ] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [eventData, setEventData] = useState<Event | null>(null);
  const { event } = useParams();

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

  const ListRender = () => {
    const list: Array<JSX.Element> = [];
    if(!stateEdit.user) {
      return (<tr></tr>);
    } else {
      const start = Moment(stateEdit.startDate);
      const end = Moment(stateEdit.endDate).add("days", 1);
      const possible_user_list = new Map();
      while(start.format() != end.format()) {
        let possible_user = 0;
        stateEdit.user.map((user: any) => {
          const jadge_possible = user.possible.some((date: string) => date == start.format("YYYY-MM-DD"));
          const jadge_subtle = user.subtle.some((date: string) => date == start.format("YYYY-MM-DD"));
          if(jadge_possible) {
            possible_user++;
          } else if(jadge_subtle) {
            possible_user += 0.5;
          }
        });
        possible_user_list.set(start.format("YYYY-MM-DD"), possible_user);
        start.add('days', 1);
      }
      
      let state_value = { 
        key: [Moment(stateEdit.startDate).format("YYYY-MM-DD")],
        value: possible_user_list.get(
          Moment(stateEdit.startDate).format("YYYY-MM-DD")
        ) 
      };
      possible_user_list.forEach((value, key) => {
        if(value > state_value.value) {
          state_value.key = [];
          state_value.key.push(key);
          state_value.value = value;
        } else if(value == state_value.value) {
          state_value.key.push(key);
        }
      });

      stateEdit.user.map((item: any) => {
        list.push(
          <tr className="table-tr">
            <UserList
              user={item}
              data={stateEdit}
              most_likely={ state_value.key }
            />
          </tr>
        );
      });
      return (<Fragment>{ list }</Fragment>);
    }
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
          <ListRender />
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