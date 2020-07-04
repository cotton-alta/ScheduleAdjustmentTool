import 
  React,
  { 
    useState,
    useEffect,
    useReducer,
    useContext,
    Fragment
  } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Moment from "moment";
import { EventContext } from "../App";
import { DateList } from "../components/ui/DateList";
import { userAction } from "../actions/user";

import "../assets/style/join.scss";

type User = {
  name:       string,
  possible:   string[],
  subtle:     string[],
  impossible: string[]
}

let initUser: User = {
  name: "",
  possible: [],
  subtle: [],
  impossible: []
}

const CheckList = (props: any) => {
  const start = Moment(props.data.startDate);
  const end = Moment(props.data.endDate);
  const list = [];

  const dateCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  while(start.format() != end.format()) {
    list.push(
      <td>
        <p>
          <input
            type="radio"
            name={`list_${list.length}`}
            value="possible"
            onChange={dateCheck}
            />
            可能
          <input
            type="radio" 
            name={`list_${list.length}`} 
            value="subtle" 
            onChange={dateCheck}
            />
            微妙
          <input 
            type="radio" 
            name={`list_${list.length}`} 
            value="impossible" 
            onChange={dateCheck}
          />
            不可能
        </p>
      </td>
    );
    start.add('days', 1);
  }
  list.push(
    <td>
    <p>
      <input
        type="radio"
        name={`list_${list.length}`}
        value="possible"
        onChange={dateCheck}
      />
        可能
      <input
        type="radio" 
        name={`list_${list.length}`} 
        value="subtle" 
        onChange={dateCheck}
      />
        微妙
      <input
        type="radio" 
        name={`list_${list.length}`} 
        value="impossible" 
        onChange={dateCheck}
      />
        不可能
    </p>
  </td>
  );
  return (<Fragment>{ list }</Fragment>);
};

const Join: React.FC = () => {
  const { stateEdit, dispatch } = useContext(EventContext);
  const { event } = useParams();
  const [ stateUser, userDispatch ] = useReducer(userAction, initUser);
  useEffect(() => {
    const start = Moment(stateEdit.startDate);
    const end = Moment(stateEdit.endDate);
    const list = [];
    initUser.possible = [];  
    initUser.subtle = [];
    initUser.impossible = [];
    while(start.format() != end.format()) {
      initUser.impossible.push(start.format("YYYY-MM-DD"));
      start.add('days', 1);
    }
    initUser.impossible.push(start.format("YYYY-MM-DD"));
    console.log(initUser.impossible);
    userDispatch({
      type: "dateInit",
      payload: {
        name: "",
        impossible : initUser.impossible,
        subtle: [],
        possible: []
      }
    });
  }, []);

  const postData = () => {
    dispatch({
      type: "setUser",
      payload: {
        stateUser
      }
    });
    console.log(stateEdit);
    axios.post(`/api/v1/events/${event}`, stateEdit.user)
      .then((result: any) => {
      
      });
  };

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);

    userDispatch({
      type: "nameChange",
      payload: {
        name: e.target.value
      }
    });
    console.log(stateUser);
  };

  return (
    <div className="join-wrapper">
      <input type="text" onChange={changeName} />
      <table className="event-table-wrapper">
        <tbody>
          <tr>
            <DateList data={ stateEdit } />
          </tr>
          <tr>
            <CheckList data={ stateEdit } />
          </tr>
        </tbody>
      </table>
      <div 
        className="join-button"
        onClick={postData}
      >
        送信
      </div>
    </div>
  );
};

export default Join;