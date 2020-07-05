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
import { CheckList } from "../components/ui/CheckList";
import { userAction } from "../actions/user";
import { withRouter } from "react-router";
import history from "../history";

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

const Join: React.FC = () => {
  const { stateEdit, dispatch } = useContext(EventContext);
  const { event } = useParams();
  const [ stateUser, userDispatch ] = useReducer(userAction, initUser);
  useEffect(() => {
    const start = Moment(stateEdit.startDate);
    const end = Moment(stateEdit.endDate);
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
    axios.post(`/api/v1/events/${event}`, stateEdit.user)
      .then((result: any) => {
        history.push(`/event/${result.data._id}`);
      });
  };

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    userDispatch({
      type: "nameChange",
      payload: {
        name: e.target.value
      }
    });
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
      {/* /.join-button */}
    </div>
    // /.join-wrapper
  );
};

export default withRouter(Join);